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
