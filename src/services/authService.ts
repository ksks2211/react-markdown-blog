import { isAxiosError } from "axios";
import blogApi from "../api/blogApi";

import type {
  RegisterUserForm,
  LogInForm,
  AuthErrorInfo,
} from "@customTypes/auth.types";

export async function isAvailableUsername(username: string) {
  const query = new URLSearchParams();
  query.set("username", username);

  try {
    const res = await blogApi.get(
      `/api/auth/is-username-taken?${query.toString()}`
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
  console.log("Create User");
  const { data } = await blogApi.post("/api/auth/register", {
    username,
    password,
    email,
  });

  console.log("Created");
  return data;
}
// JWT

export async function getJsonWebTokenFromServer({
  username,
  password,
}: LogInForm) {
  try {
    const res = await blogApi.post("/api/auth/login", { username, password });
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

export const getJwtByRefreshToken = async () => {
  const { data } = await blogApi.get("/api/token/renew", {
    withCredentials: true,
  });
  return data;
};

export const getJwtByOAuth2 = async (params: URLSearchParams) => {
  const { data } = await blogApi.get("/login/oauth2/code/google", {
    params,
  });
  return data;
};

export const deleteRefreshTokenIfExists = async () => {
  try {
    await blogApi.delete("/api/token/refresh");
  } catch (e) {
    console.error(e);
  }
};
