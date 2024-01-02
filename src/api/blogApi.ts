import axios from "axios";
import { UnauthorizedError } from "../errors";
import {
  getTokenFromBrowser,
  removeTokenFromBrowser,
} from "../services/storageService";
import { isValidToken } from "../services/storageService";

const API_ADDR = import.meta.env.VITE_API_ADDR as string;

// Blog API
const blogApi = axios.create({
  baseURL: API_ADDR,
});

blogApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error occurred in blogApi");
    if (error.response && error.response.status === 401) {
      removeTokenFromBrowser();
      throw new UnauthorizedError(error);
    }
    throw error;
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
