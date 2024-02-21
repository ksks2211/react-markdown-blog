import { AxiosError } from "axios";
import { NotFoundError, UnauthorizedError } from ".";
import { Link } from "react-router-dom";

import { ComponentType, useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import useGlobal from "../hooks/useGlobal";

const ErrorFallback: ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const { isLoggedIn, logout } = useGlobal();

  useEffect(() => {
    if (isLoggedIn && error instanceof UnauthorizedError) {
      logout();
    }
  }, [error, isLoggedIn, logout]);

  let cause = "";

  if (error instanceof NotFoundError) {
    cause = "Not Found Error";
  }

  if (error instanceof AxiosError) {
    // error.status
    cause = "Axios Error";
  }

  return (
    <div role="alert">
      <p>Something went wrong:{cause}</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
      <Link to="/login">Go Back to Log In</Link>
    </div>
  );
};

export default ErrorFallback;
