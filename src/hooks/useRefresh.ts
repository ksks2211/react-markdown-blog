import { useMutation } from "react-query";
import blogApi, { setTokenToBrowser } from "../api/auth";
import { Token } from "./useToken";
import useGlobal from "./useGlobal";

const getTokenFromServer = async () => {
  const { data } = await blogApi.get("/refresh");
  return data;
};

export default function useRefresh() {
  const { setIsLoggedIn } = useGlobal();

  return useMutation<Token, Error>({
    retry: false,
    mutationFn: () => getTokenFromServer(),
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
