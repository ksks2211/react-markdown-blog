import blogApi from "../api/blogApi";
import type {
  RegisterUserForm,
  LogInForm,
  JWTInfo,
} from "@customTypes/auth.types";

const AUTH_PREFIX = "/api/auth";
const TOKEN_PREFIX = "/api/token";

export async function isAvailableUsername(username: string) {
  const query = new URLSearchParams();
  query.set("username", username);

  try {
    const res = await blogApi.get(
      `${AUTH_PREFIX}/is-username-taken?${query.toString()}`
    );
    if (res.status === 200) return true;
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
}: LogInForm) {
  const { data } = await blogApi.post(`${AUTH_PREFIX}/login`, {
    username,
    password,
  });
  return data as JWTInfo;
}

export const getJwtByRefreshToken = async () => {
  const { data } = await blogApi.get(`${TOKEN_PREFIX}/renew`, {
    withCredentials: true,
  });
  return data as JWTInfo;
};

export const deleteRefreshTokenIfExists = async () => {
  try {
    await blogApi.delete(`${TOKEN_PREFIX}/refresh`);
  } catch (e) {
    console.error(e);
  }
};

export const getJwtByOAuth2 = async (params: URLSearchParams) => {
  const { data } = await blogApi.get("/login/oauth2/code/google", {
    params,
  });
  await blogApi.get("/login/complete");
  return data as JWTInfo;
};
