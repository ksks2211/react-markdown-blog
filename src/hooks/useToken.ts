import { removeTokenFromBrowser, setTokenToBrowser } from "../api/auth";
import { useMutation } from "react-query";
import blogApi from "../api/auth";
import useGlobal from "./useGlobal";

export interface Token {
  statusCode: number;
  message: string;
  token: string;
}

const getTokenFromServer = async (username: string, password: string) => {
  const res = await blogApi.post(
    "/auth/log-in",
    { username, password }
    // { withCredentials: true }
  );

  console.log(res.headers);
  return res.data;
};

export default function useToken(username: string, password: string) {
  const { setIsLoggedIn } = useGlobal();

  return useMutation<Token, Error>({
    mutationFn: () => getTokenFromServer(username, password),
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
