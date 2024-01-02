import {
  removeTokenFromBrowser,
  setTokenToBrowser,
} from "../services/storageService";
import { useMutation } from "react-query";
import useGlobal from "./useGlobal";
import { getJsonWebTokenFromServer } from "../services/authService";
import { getRefreshTokenFromServer } from "../services/authService";

interface LoginData {
  username: string;
  password: string;
}

type SetErrorMessage = (e: string | undefined) => void;

export interface Token {
  statusCode: number;
  message: string;
  token: string;
  username: string;
}

export function useJsonWebToken({
  setErrorMessage,
}: {
  setErrorMessage: SetErrorMessage;
}) {
  const { setIsLoggedIn, setUsername } = useGlobal();

  return useMutation<Token, Error, LoginData, unknown>({
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

  return useMutation<Token, Error>({
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
