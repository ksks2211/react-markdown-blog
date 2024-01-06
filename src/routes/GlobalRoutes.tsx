import { Navigate, Route, Routes } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";
import LogIn from "../pages/LogInPage";
import PrivateRoutes from "./PrivateRoutes";
import SignUp from "../pages/SignUpPage";

const GlobalRoutes = () => {
  const { isLoggedIn } = useGlobal();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />}
      />
      <Route
        path="/sign-up"
        element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="*"
        element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default GlobalRoutes;
