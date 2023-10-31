import axios from "axios";
import jwt_decode from "jwt-decode";
import { UnauthorizedError } from "../errors";

interface JWT {
  exp: number;
}

const TOKEN_KEY = "jwt_token";

const API_ADDR = import.meta.env.VITE_API_ADDR as string;

export const setTokenToBrowser = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromBrowser = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromBrowser = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isValidToken = () => {
  const token = getTokenFromBrowser();
  if (token) {
    try {
      // If you want to check expiration
      const decoded = jwt_decode<JWT>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // Token is expired
        removeTokenFromBrowser();
        return false;
      } else {
        return true;
      }
    } catch (error) {
      removeTokenFromBrowser();
      return false;
    }
  }

  return false;
};

const blogApi = axios.create({
  baseURL: API_ADDR,
});

blogApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error Response");
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      removeTokenFromBrowser();
    }
    return Promise.reject(new UnauthorizedError(error));
  }
);

blogApi.interceptors.request.use((request) => {
  if (isValidToken()) {
    const token = getTokenFromBrowser();
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export default blogApi;
