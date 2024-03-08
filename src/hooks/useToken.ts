import { useMutation } from "react-query";

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
  const { logout, login } = useGlobal();

  const loginMutation = useMutation<
    LoginSuccessResponse,
    BadRequestError,
    LoginData & { needRefreshToken: boolean }
  >({
    mutationFn: ({ username, password }) => {
      return getJsonWebTokenFromServer({ username, password });
    },
    onSuccess: (data, variable) => {
      if (variable.needRefreshToken) {
        // refreshTokenMutation.mutate
      }
      login(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      logout();
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
  const { login, logout } = useGlobal();

  return useMutation<LoginSuccessResponse, Error>({
    retry: false,
    mutationFn: getJwtByRefreshToken,
    onSuccess: (data) => {
      login(data);
    },
    onError: (e) => {
      console.error(e.message);
      logout();
    },
  });
}

export function useLoginWithOAuth2() {
  const { login, logout } = useGlobal();

  return useMutation<LoginSuccessResponse, Error, URLSearchParams, unknown>({
    retry: false,
    mutationFn: (params) => getJwtByOAuth2(params),
    onSuccess: (data) => {
      login(data);
    },
    onError: (e) => {
      console.error(e.message);
      logout();
    },
  });
}

export function useRemoveRefreshToken() {
  return useMutation<void, Error, void, unknown>({
    retry: false,
    mutationFn: deleteRefreshTokenIfExists,
  });
}
