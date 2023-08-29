import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import GlobalProvider from "./GlobalProvider";
import Posts from "./pages/Posts";
import Categories from "./pages/Categories";
import Data from "./pages/Data";
import Maps from "./pages/Maps";
import ErrorFallback from "./errors/ErrorFallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/posts" element={<Posts />}></Route>
            <Route path="/categories" element={<Categories />} />
            <Route path="/data" element={<Data />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/log-in" element={<LogIn />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
