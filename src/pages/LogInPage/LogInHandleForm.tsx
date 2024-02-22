import { useCallback, useRef, type FormEvent } from "react";
import { AiFillLock } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { useLoginWithOptionalRefresh } from "../../hooks/useToken";
import type { LogInForm } from "@customTypes/auth.types";
import profile from "../../assets/profile.png";
import google from "../../assets/google.svg";
import {
  StyledLoginForm,
  LoginButton,
  GoogleButton,
  StyledWarningWrapper,
} from "./LogInHandleForm.styles";
import CircularProgress from "@mui/material/CircularProgress";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { StyledLogo } from "./LogInPage.styles";
import throttle from "lodash-es/throttle";
import { useEnterKeyPressHandler } from "../../hooks/useHandler";

const FORMIK_INITIAL_VALUE = {
  username: "",
  password: "",
};

const FORMIK_VALIDATION_SCHEMA = Yup.object({
  username: Yup.string()
    .min(5, "Username is longer than 5 letters")
    .required("Username Required"),
  password: Yup.string()
    .min(5, "Password is longer than 5 letters")
    .required("Password Required"),
});

const CircularProgressStyles = {
  color: "white",
};
export function LogInInputForm({
  setErrorMessage,
}: {
  setErrorMessage: (msg: string | null) => void;
}) {
  const { performLoginAsync, loginMutation } = useLoginWithOptionalRefresh({
    setErrorMessage,
  });

  const usernameRef = useRef<HTMLInputElement>(null);

  const handleLogInFormSubmit = useCallback(
    async (value: LogInForm) => {
      if (!loginMutation.isLoading) {
        await performLoginAsync(value, false);
      }
    },
    [loginMutation.isLoading, performLoginAsync]
  );

  const handleFormikSubmit = useCallback(
    async (
      value: LogInForm,
      { setSubmitting, resetForm }: FormikHelpers<LogInForm>
    ) => {
      setSubmitting(false);

      try {
        await handleLogInFormSubmit(value);
      } catch (e) {
        // reset mutation and form
        loginMutation.reset();
        resetForm();
        if (usernameRef && usernameRef.current) {
          usernameRef.current.focus();
        }
      }
    },
    [handleLogInFormSubmit, loginMutation]
  );

  const formik = useFormik({
    initialValues: FORMIK_INITIAL_VALUE,
    validationSchema: FORMIK_VALIDATION_SCHEMA,
    onSubmit: handleFormikSubmit,
  });

  const { enterKeyPressHandler: handleKeyDown } = useEnterKeyPressHandler(
    formik.handleSubmit
  );

  const handleGoogle = throttle((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const API_ADDR = import.meta.env.VITE_API_ADDR as string;
    location.href = `${API_ADDR}/oauth2/authorization/google`;
  }, 2000);

  const handleLogin = throttle(() => {
    formik.handleSubmit();
  }, 2000);

  return (
    <StyledLoginForm onSubmit={formik.handleSubmit}>
      <StyledLogo className="logo">
        <img src={profile} alt="logo" />
      </StyledLogo>
      <div className="greetings">Welcome!</div>

      <div id="username-field" className="input-field">
        <BiSolidUser className="icon" />
        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
          autoComplete="off"
          {...formik.getFieldProps("username")}
        />
      </div>

      <div id="password-field" className="input-field">
        <AiFillLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          {...formik.getFieldProps("password")}
        />
      </div>

      <StyledWarningWrapper>
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </StyledWarningWrapper>

      <LoginButton type="button" onClick={handleLogin}>
        {loginMutation.isLoading ? (
          <CircularProgress
            size={20}
            thickness={4.2}
            sx={CircularProgressStyles}
          />
        ) : (
          "Login"
        )}
      </LoginButton>

      <GoogleButton type="button" onClick={handleGoogle}>
        <img src={google} alt="google" />
        Continue with Google
      </GoogleButton>
    </StyledLoginForm>
  );
}
