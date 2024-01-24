import { useRef, type FormEvent } from "react";
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
import debounce from "lodash-es/debounce";

import { useFormik } from "formik";
import * as Yup from "yup";

export function LogInInputForm({
  setErrorMessage,
}: {
  setErrorMessage: (msg: string | null) => void;
}) {
  const { performLoginAsync, loginMutation } = useLoginWithOptionalRefresh({
    setErrorMessage,
  });

  const usernameRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  };

  const handleLogInFormSubmit = async (value: LogInForm) => {
    if (!loginMutation.isLoading) {
      await performLoginAsync(value, false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username is longer than 5 letters")
        .required("Username Required"),
      password: Yup.string()
        .min(5, "Password is longer than 5 letters")
        .required("Password Required"),
    }),
    onSubmit: async (value: LogInForm, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      await handleLogInFormSubmit(value);

      // Log-in fail
      resetForm();

      if (usernameRef && usernameRef.current) {
        usernameRef.current.focus();
      }
    },
  });

  const handleGoogle = debounce((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location.href = "http://localhost:8080/oauth2/authorization/google";
  }, 1200);

  return (
    <StyledLoginForm onSubmit={formik.handleSubmit}>
      <div className="logo">
        <img src={profile} alt="logo" />
      </div>
      <div className="greetings">Welcome!</div>

      <div id="username-field" className="input-field">
        <BiSolidUser className="icon" />
        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
          {...formik.getFieldProps("username")}
        />
      </div>

      <div id="password-field" className="input-field">
        <AiFillLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          onKeyDown={handleKeyDown}
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

      <LoginButton type="submit">
        {loginMutation.isLoading ? (
          <CircularProgress
            size={20}
            thickness={4.2}
            sx={{
              color: "white",
            }}
          />
        ) : (
          "Login"
        )}
      </LoginButton>

      <GoogleButton onClick={handleGoogle}>
        <img src={google} alt="google" />
        Continue with Google
      </GoogleButton>
    </StyledLoginForm>
  );
}
