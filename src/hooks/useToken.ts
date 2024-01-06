import { useMutation } from "react-query";

import {
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "../services/storageService";
import useGlobal from "./useGlobal";
import {
  getJsonWebTokenFromServer,
  getRefreshTokenFromServer,
} from "../services/authService";
import { JWTInfo } from "../types/auth.types";

interface LoginData {
  username: string;
  password: string;
}

type SetErrorMessage = (e: string | undefined) => void;

export function useJsonWebToken({
  setErrorMessage,
}: {
  setErrorMessage: SetErrorMessage;
}) {
  const { setIsLoggedIn, setUsername } = useGlobal();

  return useMutation<JWTInfo, Error, LoginData, unknown>({
    mutationFn: ({ username, password }) =>
      getJsonWebTokenFromServer({ username, password }),
    onSuccess: ({ token, username }) => {
      setTokenToBrowser(token);
      setUsername(username);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      removeTokenFromBrowser();
      setIsLoggedIn(false);
    },
  });
}

export function useRefreshToken() {
  const { setIsLoggedIn } = useGlobal();

  return useMutation<JWTInfo, Error>({
    retry: false,
    mutationFn: getRefreshTokenFromServer,
    onSuccess: (data) => {
      const token = data.token;
      setTokenToBrowser(token);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
