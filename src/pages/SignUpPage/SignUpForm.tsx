import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateUser } from "../../hooks/useUser";
import type { RegisterUserForm } from "@customTypes/auth.types";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  LoginButton,
  StyledLoginForm,
  StyledWarningWrapper,
} from "../LogInPage/LogInHandleForm.styles";
import profile from "../../assets/profile.png";
import { BiSolidUser } from "react-icons/bi";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";

import CircularProgress from "@mui/material/CircularProgress";
import { StyledLogo } from "../LogInPage/LogInPage.styles";

export function SignUpForm({
  setErrorMessage,
}: {
  setErrorMessage: (msg: string | null) => void;
}) {
  const navigate = useNavigate();

  const mutation = useCreateUser(setErrorMessage);
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  };

  const handleSignUpForm = async (value: RegisterUserForm) => {
    await mutation.mutateAsync(value);
    alert("Registered");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username is longer than 5 letters")
        .required("Username Required"),
      password: Yup.string()
        .min(5, "Password is longer than 5 letters")
        .required("Password Required"),
      email: Yup.string().email("Email Address is needed").notRequired(),
    }),
    onSubmit: async (value: RegisterUserForm, { setSubmitting, resetForm }) => {
      setSubmitting(false);

      await handleSignUpForm(value);

      // Log-in fail
      resetForm();
      if (usernameRef && usernameRef.current) {
        usernameRef.current.focus();
      }
    },
  });

  return (
    <StyledLoginForm onSubmit={formik.handleSubmit}>
      <StyledLogo>
        <img src={profile} alt="logo" />
      </StyledLogo>
      <div className="greetings">Register!</div>

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

      <div id="email-field" className="input-field">
        <AiOutlineMail className="icon" />
        <input
          type="email"
          placeholder="email"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          {...formik.getFieldProps("email")}
        />
      </div>

      <StyledWarningWrapper>
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </StyledWarningWrapper>

      <LoginButton
        type="button"
        onClick={() => {
          formik.handleSubmit();
        }}
      >
        {mutation.isLoading ? (
          <CircularProgress
            size={20}
            thickness={4.2}
            sx={{
              color: "white",
            }}
          />
        ) : (
          "Sign Up"
        )}
      </LoginButton>
    </StyledLoginForm>
  );
}
