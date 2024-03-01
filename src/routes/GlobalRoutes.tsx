import { Navigate, Route, Routes } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";

import { lazy } from "react";
import SuspenseLoader from "../components/common/SuspenseLoader";
import ImageUploader from "../components/containers/LeftSidebarContainer.tsx/ImageUploader";

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
            <SuspenseLoader>
              <LogIn />
            </SuspenseLoader>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/login/google"
        element={
          !isLoggedIn ? (
            <SuspenseLoader>
              <GoogleLogIn />
            </SuspenseLoader>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/sign-up"
        element={
          !isLoggedIn ? (
            <SuspenseLoader>
              <SignUp />
            </SuspenseLoader>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="/test" element={<ImageUploader />} />

      <Route
        path="*"
        element={
          isLoggedIn ? (
            <SuspenseLoader>
              <PrivateRoutes />
            </SuspenseLoader>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default GlobalRoutes;
