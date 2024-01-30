import { Navigate, Route, Routes } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";

import { Suspense, lazy } from "react";
import Loader from "../components/common/Loader";

const LogIn = lazy(() => import("../pages/LogInPage"));
const SignUp = lazy(() => import("../pages/SignUpPage/SignUpPage"));
const GoogleLogIn = lazy(() => import("../pages/GoogleLogIn"));
const PrivateRoutes = lazy(() => import("./PrivateRoutes"));

const GlobalRoutes = () => {
  const { isLoggedIn } = useGlobal();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isLoggedIn ? (
            <Suspense fallback={<Loader />}>
              <LogIn />
            </Suspense>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/login/google"
        element={
          !isLoggedIn ? (
            <Suspense fallback={<Loader />}>
              <GoogleLogIn />
            </Suspense>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/sign-up"
        element={
          !isLoggedIn ? (
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Suspense fallback={<Loader />}>
              <PrivateRoutes />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default GlobalRoutes;
