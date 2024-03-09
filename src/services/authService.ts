import blogApi from "../api/blogApi";
import type {
  RegisterUserForm,
  LoginForm,
  LoginSuccessResponse,
} from "@customTypes/auth.types";
import { HttpStatusCode } from "axios";

const AUTH_PREFIX = "/api/auth";
const TOKEN_PREFIX = "/api/token";

export async function isAvailableUsername(username: string) {
  const params = new URLSearchParams();
  params.set("username", username);

  try {
    const res = await blogApi.get(`${AUTH_PREFIX}/is-username-taken`, {
      params,
    });
    if (res.status === HttpStatusCode.Ok) return true;
  } catch (e) {
    console.info(e);
  }

  return false;
}

export async function createUser({
  username,
  password,
  email,
}: RegisterUserForm) {
  const { data } = await blogApi.post(`${AUTH_PREFIX}/register`, {
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
}: LoginForm) {
  const { data } = await blogApi.post(`${AUTH_PREFIX}/login`, {
    username,
    password,
  });
  return data as LoginSuccessResponse;
}

export const getJwtByRefreshToken = async () => {
  const { data } = await blogApi.get(`${TOKEN_PREFIX}/renew`, {
    withCredentials: true,
  });
  return data as LoginSuccessResponse;
};

export const deleteRefreshTokenIfExists = async () => {
  try {
    await blogApi.delete(`${TOKEN_PREFIX}/refresh`);
  } catch (e) {
    console.error(e);
  }
};

export const getJwtByOAuth2 = async (params: URLSearchParams) => {
  console.log(params.toString());

  const { data } = await blogApi.get("/login/oauth2/code/google", {
    params,
  });
  // await blogApi.get("/login/complete");
  return data as LoginSuccessResponse;
};

export const updateUserProfile = async (profile: string) => {
  await blogApi.put(`${AUTH_PREFIX}/update`, { profile });
};
