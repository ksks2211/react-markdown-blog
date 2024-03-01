import { useMutation } from "react-query";

import {
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "../services/storageService";
import useGlobal from "./useGlobal";
import {
  deleteRefreshTokenIfExists,
  getJsonWebTokenFromServer,
  getJwtByOAuth2,
  getJwtByRefreshToken,
} from "../services/authService";
import type { LoginSuccessResponse, LoginForm } from "@customTypes/auth.types";
import { BadRequestError } from "../errors/HttpErrors";

interface LoginData {
  username: string;
  password: string;
}

type SetErrorMessage = (e: string) => void;

export function useLoginWithOptionalRefresh({
  setErrorMessage,
}: {
  setErrorMessage: SetErrorMessage;
}) {
  const { setIsLoggedIn, setUsername, setDisplayName, changeProfileImageId } =
    useGlobal();

  const loginMutation = useMutation<
    LoginSuccessResponse,
    BadRequestError,
    LoginData & { needRefreshToken: boolean }
  >({
    mutationFn: ({ username, password }) => {
      return getJsonWebTokenFromServer({ username, password });
    },
    onSuccess: ({ token, displayName, profileImageId }, variable) => {
      if (variable.needRefreshToken) {
        // refreshTokenMutation.mutate
      }
      setTokenToBrowser(token);
      setUsername(variable.username);
      setDisplayName(displayName);
      changeProfileImageId(profileImageId || -1);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      removeTokenFromBrowser();
      setIsLoggedIn(false);
    },
  });

  const performLoginAsync = async (
    loginForm: LoginForm,
    needRefreshToken = false
  ) => {
    return await loginMutation.mutateAsync({
      ...loginForm,
      needRefreshToken,
    });
  };

  return { loginMutation, performLoginAsync };
}

export function useLoginWithRefreshToken() {
  const { setIsLoggedIn } = useGlobal();

  return useMutation<LoginSuccessResponse, Error>({
    retry: false,
    mutationFn: getJwtByRefreshToken,
    onSuccess: (data) => {
      const token = data.token;
      setTokenToBrowser(token);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.info(error);
    },
  });
}

export function useLoginWithOAuth2() {
  const { setIsLoggedIn, setUsername, setDisplayName, changeProfileImageId } =
    useGlobal();

  return useMutation<LoginSuccessResponse, Error, URLSearchParams, unknown>({
    retry: false,
    mutationFn: (params) => getJwtByOAuth2(params),
    onSuccess: ({ token, username, displayName, profileImageId }) => {
      setTokenToBrowser(token);
      setUsername(username);
      setDisplayName(displayName);
      changeProfileImageId(profileImageId || -1);
      setIsLoggedIn(true);
    },
    onError: (e) => {
      console.error(e.message);
      removeTokenFromBrowser();
      setIsLoggedIn(false);
    },
  });
}

export function useRemoveRefreshToken() {
  return useMutation<void, Error, void, unknown>({
    retry: false,
    mutationFn: deleteRefreshTokenIfExists,
  });
}
