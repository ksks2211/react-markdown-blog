import axios, { isAxiosError } from "axios";
import { NotFoundError, UnauthorizedError } from "../errors";
import { getTokenFromBrowser, isValidToken } from "../services/storageService";
import type { ErrorResponse } from "@customTypes/response.types";
import { BadRequestError } from "../errors/BadRequestError";

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
    console.info("Error occurred in blogApi");
    if (isAxiosError(error)) {
      console.info(error);
    }

    // no response error
    if (!error.response) throw error;

    const { response } = error;

    if (response.status === 400)
      throw new BadRequestError(response.data as ErrorResponse);
    if (response.status === 401)
      throw new UnauthorizedError(response.data as ErrorResponse);
    if (response.status === 404)
      throw new NotFoundError(response.data.message || "Not Found Error");
    if (response.status === 409) throw new Error(response.data.message);

    throw new Error(response.data.message);
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
