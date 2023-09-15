import { Navigate, Route, Routes } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";
import LogIn from "../pages/LogIn";
import PrivateRoutes from "./PrivateRoutes";

const GlobalRoutes = () => {
  const { isLoggedIn } = useGlobal();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />}
      />
      <Route
        path="*"
        element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default GlobalRoutes;
