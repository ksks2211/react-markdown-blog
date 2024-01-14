import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./errors/ErrorFallback";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalProvider from "./contexts/GlobalProvider";
import GlobalRoutes from "./routes/GlobalRoutes";

const queryClient = new QueryClient();

function App() {
  // const oauth2Params = new URLSearchParams(param);
  // const askedLogin = oauth2Params.get("asked-login");
  // if (askedLogin !== null) oauth2Params.delete("asked-login");

  // if (askedLogin) {
  //   return <div>{oauth2Params}</div>;
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <GlobalProvider>
            <GlobalRoutes />
          </GlobalProvider>
        </BrowserRouter>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
