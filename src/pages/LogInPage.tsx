import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import TopFullBar from "../components/common/TopFullBar";
import styles from "./LogInPage.module.scss";
import cn from "classnames/bind";
import { AiFillLock } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { useLoginWithOptionalRefresh } from "../hooks/useToken";
import { Link } from "react-router-dom";
import { LogInForm } from "../types/auth.types";
const cx = cn.bind(styles);

export default function LogIn() {
  const [loginForm, setLoginForm] = useState<LogInForm>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { performLoginAsync } = useLoginWithOptionalRefresh({
    setErrorMessage,
  });

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(undefined);
    }
  }, [errorMessage]);

  const handleLogInFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await performLoginAsync(loginForm);
  };

  const handleLogInFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogle = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <>
      <TopFullBar title="Log In">
        <Link to="/sign-up">Sign Up</Link>
      </TopFullBar>
      <div className={cx("LoginForm")}>
        <div className={cx("login-card")}>
          <form onSubmit={handleLogInFormSubmit}>
            <div className={cx("input-group", "username")}>
              <BiSolidUser className={cx("left-icon")} />
              <input
                type="text"
                name="username"
                placeholder="username"
                value={loginForm.username}
                onChange={handleLogInFormChange}
                required
              />
            </div>
            <div className={cx("input-group", "password")}>
              <AiFillLock className={cx("left-icon")} />
              <input
                name="password"
                type="password"
                value={loginForm.password}
                placeholder="Password"
                onChange={handleLogInFormChange}
                required
              />
            </div>
            <button className={cx("input-group", "submit-btn")} type="submit">
              Login
            </button>

            <button onClick={handleGoogle}>구글</button>
          </form>
        </div>
      </div>
    </>
  );
}
