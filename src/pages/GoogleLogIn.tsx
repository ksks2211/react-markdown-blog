import { Navigate, useSearchParams } from "react-router-dom";
import { useLoginWithOAuth2 } from "../hooks/useToken";
import Loader from "../components/Loader";
import ErrorFallback from "../errors/ErrorFallback";

function GoogleLogIn() {
  const [oauth2Params] = useSearchParams();
  const mutation = useLoginWithOAuth2();

  mutation.mutate(oauth2Params);

  if (mutation.isError) {
    return (
      <ErrorFallback
        error={mutation.error}
        resetErrorBoundary={() => mutation.mutate(oauth2Params)}
      />
    );
  }

  if (mutation.isSuccess) {
    return <Navigate to="/" />;
  }

  return <Loader />;
}

export default GoogleLogIn;
