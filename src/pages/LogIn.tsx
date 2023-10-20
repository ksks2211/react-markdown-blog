import { useState } from "react";
import type { FormEvent } from "react";
import TopFullBar from "../components/layout/TopFullBar";
import styles from "./Login.module.scss";
import cn from "classnames/bind";
import { AiFillLock } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import useToken from "../hooks/useToken";
// import useRefresh from "../hooks/useRefresh";
const cx = cn.bind(styles);

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [tryRefresh, setTryRefresh] = useState(false);

  const tokenMutation = useToken();
  // const mutationRefresh = useRefresh();

  // try refresh
  // useEffect(() => {
  //   if (!tryRefresh) {
  //     (async function () {
  //       await mutationRefresh.mutateAsync();
  //     })();
  //   }
  //   setTryRefresh(true);
  // }, [mutationRefresh, tryRefresh]);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await tokenMutation.mutateAsync({ username, password });
  };

  return (
    <>
      <TopFullBar title="Log In" />
      <div className={cx("LoginForm")}>
        <div className={cx("login-card")}>
          <form onSubmit={submitForm}>
            <div className={cx("input-group", "username")}>
              <BiSolidUser className={cx("left-icon")} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={cx("input-group", "password")}>
              <AiFillLock className={cx("left-icon")} />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={cx("input-group", "submit-btn")} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
