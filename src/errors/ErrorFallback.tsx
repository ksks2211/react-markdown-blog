import { AxiosError } from "axios";
import { NotFoundError, UnauthorizedError } from ".";
import { Link } from "react-router-dom";

import { ComponentType } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  let cause = "";

  if (error instanceof NotFoundError) {
    cause = "Not Found Error";
  }

  if (error instanceof AxiosError) {
    // error.status
    cause = "Axios Error";
  }

  if (error instanceof UnauthorizedError) {
    cause = "Unauthorized Error";
  }

  // ... other custom error types

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
