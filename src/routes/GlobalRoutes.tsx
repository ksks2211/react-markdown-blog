import { Navigate, Route, Routes } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";
import LogIn from "../pages/LogInPage/LogInPage";
import PrivateRoutes from "./PrivateRoutes";
import SignUp from "../pages/SignUpPage";
import GoogleLogIn from "../pages/GoogleLogIn";

const GlobalRoutes = () => {
  const { isLoggedIn } = useGlobal();

  return (
    <Routes>
      <Route
        path="/login"
        element={!isLoggedIn ? <LogIn /> : <Navigate to="/" />}
      />

      <Route
        path="/login/google"
        element={!isLoggedIn ? <GoogleLogIn /> : <Navigate to="/" />}
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
