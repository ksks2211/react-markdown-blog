import { Navigate, useSearchParams } from "react-router-dom";
import { useLoginWithOAuth2 } from "../hooks/useToken";
import Loader from "../components/common/Loader";

function GoogleLogIn() {
  const [oauth2Params] = useSearchParams();
  const mutation = useLoginWithOAuth2();

  oauth2Params.forEach((value, key) => {
    console.log(`V:${value}, K : ${key}`);
  });

  mutation.mutate(oauth2Params);

  if (mutation.isError) {
    const message = encodeURIComponent(mutation.error.message);
    return <Navigate to={`/login?error=${message}`} />;
  }

  if (mutation.isSuccess) {
    return <Navigate to="/" />;
  }

  return <Loader />;
}

export default GoogleLogIn;
