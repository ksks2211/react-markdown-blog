import { isAxiosError } from "axios";
import blogApi from "../api/blogApi";

import {
  RegisterUserForm,
  LogInForm,
  AuthErrorInfo,
} from "../types/auth.types";

export async function isAvailableUsername(username: string) {
  const query = new URLSearchParams();
  query.set("username", username);

  try {
    const res = await blogApi.get(
      `/auth/is-username-taken?${query.toString()}`
    );
    if (res.status === 200) return true;
  } catch (e) {
    console.error(e);
  }

  return false;
}

export async function createUser({
  username,
  password,
  email,
}: RegisterUserForm) {
  const { data } = await blogApi.post("/auth/register", {
    username,
    password,
    email,
  });
  return data;
}
// JWT

export async function getJsonWebTokenFromServer({
  username,
  password,
}: LogInForm) {
  try {
    const res = await blogApi.post("/auth/log-in", { username, password });
    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorResponse = error.response.data as AuthErrorInfo;
      throw new Error(errorResponse.message);
    } else {
      throw new Error("Login Failed");
    }
  }
}
export const getRefreshTokenFromServer = async () => {
  const { data } = await blogApi.get("/refresh");
  return data;
};
