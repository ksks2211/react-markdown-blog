import { removeTokenFromBrowser, setTokenToBrowser } from "../api/auth";
import { useMutation } from "react-query";
import useGlobal from "./useGlobal";
import { getTokenFromServer } from "../api";

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

export default function useToken(setErrorMessage: SetErrorMessage) {
  const { setIsLoggedIn, setUsername } = useGlobal();

  return useMutation<Token, Error, LoginData, unknown>({
    mutationFn: ({ username, password }) =>
      getTokenFromServer(username, password),
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
