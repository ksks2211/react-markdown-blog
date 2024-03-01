import axios, { isAxiosError, HttpStatusCode } from "axios";
import { getTokenFromBrowser, hasValidToken } from "../services/storageService";
import type { ErrorResponse } from "@customTypes/response.types";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
  RequestFailError,
} from "../errors/HttpErrors";

const API_ADDR = import.meta.env.VITE_API_ADDR as string;

// Blog API
const blogApi = axios.create({
  baseURL: API_ADDR,
});

axios.defaults.withCredentials = true;

blogApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.info("Error occurred in blogApi");
    if (isAxiosError(error)) {
      console.info(error);
    }

    // no response error (network failure etc)
    if (!error.response) {
      throw new RequestFailError(
        error?.message ||
          "Failed to get response from server. Check server state!"
      );
    }

    const { response } = error;

    if (response.status === HttpStatusCode.BadRequest)
      throw new BadRequestError(response.data as ErrorResponse);
    if (response.status === HttpStatusCode.Unauthorized)
      throw new UnauthorizedError(response.data as ErrorResponse);
    if (response.status === HttpStatusCode.NotFound)
      throw new NotFoundError(response.data as ErrorResponse);
    if (response.status === HttpStatusCode.Conflict)
      throw new ConflictError(response.data as ErrorResponse);

    throw new Error(response.data.message);
  }
);

blogApi.interceptors.request.use((request) => {
  // use token only when it exists & token is not expired
  if (hasValidToken()) {
    const token = getTokenFromBrowser();
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export default blogApi;
