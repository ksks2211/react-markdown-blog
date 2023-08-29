import { NotFoundError, UnauthorizedError } from ".";

interface FallbackProps {
  error: Error;
}

const ErrorFallback = ({ error }: FallbackProps) => {
  let cause = "";

  if (error instanceof NotFoundError) {
    cause = "Not Found Error";
  }

  if (error instanceof UnauthorizedError) {
    cause = "Unauthorized Error";
  }

  // ... other custom error types

  return (
    <div role="alert">
      <p>Something went wrong:{cause}</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
