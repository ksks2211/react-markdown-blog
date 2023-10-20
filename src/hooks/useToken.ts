import { removeTokenFromBrowser, setTokenToBrowser } from "../api/auth";
import { useMutation } from "react-query";
import useGlobal from "./useGlobal";
import { getTokenFromServer } from "../api";

interface LoginData {
  username: string;
  password: string;
}
export interface Token {
  statusCode: number;
  message: string;
  token: string;
}

export default function useToken() {
  const { setIsLoggedIn } = useGlobal();

  return useMutation<Token, Error, LoginData, unknown>({
    mutationFn: ({ username, password }) =>
      getTokenFromServer(username, password),
    onSuccess: (data) => {
      const token = data.token;
      setTokenToBrowser(token);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error(error);
      removeTokenFromBrowser();
      setIsLoggedIn(false);
    },
  });
}
