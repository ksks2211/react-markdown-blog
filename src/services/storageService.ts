import type { JWT } from "@customTypes/auth.types";
import jwtDecode from "jwt-decode";
import { toInteger } from "lodash-es";

const TOKEN_KEY = "jwt_token";

export const setTokenToBrowser = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromBrowser = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromBrowser = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.clear();
};

export const hasValidToken = () => {
  const token = getTokenFromBrowser();
  if (token) {
    try {
      // If you want to check expiration
      const decoded = jwtDecode<JWT>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // Token is expired
        removeTokenFromBrowser();
        return false;
      } else {
        sessionStorage.setItem("username", decoded.sub);
        sessionStorage.setItem("displayName", decoded.displayName);
        sessionStorage.setItem("profileImageId", decoded.profileImageId);
        return true;
      }
    } catch (error) {
      removeTokenFromBrowser();
      return false;
    }
  }
  return false;
};

export const getUsername = () => {
  const username = sessionStorage.getItem("username") || "";
  return username;
};

export const getDisplayName = () => {
  const username = sessionStorage.getItem("displayName") || "";
  return username;
};

export const getProfileImageId = () => {
  const imageId = sessionStorage.getItem("profileImageId") || "-1";
  return toInteger(imageId);
};

export const setProfileImageIdInStorage = (id: number) => {
  sessionStorage.setItem("profileImageId", id.toString());
};
