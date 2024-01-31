import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./errors/ErrorFallback";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalProvider from "./contexts/GlobalProvider";
import GlobalRoutes from "./routes/GlobalRoutes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <GlobalRoutes />
            </ThemeProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </GlobalProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
