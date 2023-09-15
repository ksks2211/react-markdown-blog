import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface JWT {
  exp: number;
}

export const TOKEN_KEY = "jwt_token";

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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error");
    const navigate = useNavigate();

    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      removeTokenFromBrowser();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export const blogApi = axios.create({
  baseURL: "http://localhost:8080",
});

blogApi.interceptors.request.use((config) => {
  const token = getTokenFromBrowser();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default blogApi;
