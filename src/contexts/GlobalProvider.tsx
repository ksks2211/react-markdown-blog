import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import {
  getUsername,
  hasValidToken,
  removeTokenFromBrowser,
  getDisplayName,
  getProfile,
  setProfile,
  setTokenToBrowser,
} from "../services/storageService";
import Menu from "./Menu.enum";
import { useRemoveRefreshToken } from "../hooks/useToken";
import throttle from "lodash-es/throttle";
import type { LoginSuccessResponse } from "@customTypes/auth.types";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(hasValidToken()); // Login State Check
  const [username, setUsername] = useState<string>(getUsername());
  const [displayName, setDisplayName] = useState<string>(getDisplayName());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, changeProfile] = useState<string>(getProfile());

  const mutation = useRemoveRefreshToken();

  // Login State Double Checker
  useEffect(() => {
    setIsLoggedIn(hasValidToken());
  }, []);

  const logout = throttle(async () => {
    try {
      await mutation.mutateAsync();
    } catch (e) {
      console.warn(e);
    }

    setIsLoggedIn(false);
    setUsername("");
    setDisplayName("");
    setProfile("");

    removeTokenFromBrowser();
  }, 2000);

  const updateProfile = (profile: string) => {
    changeProfile(profile);
    setProfile(profile);
  };

  const login = (data: LoginSuccessResponse) => {
    setTokenToBrowser(data.token);
    setUsername(data.username);
    setDisplayName(data.displayName);
    updateProfile(data.profile || "");
    setIsLoggedIn(true);
  };

  const globalValue = {
    selectedMenu,
    changeMenu: setSelectedMenu,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    logout,
    login,
    displayName,
    setDisplayName,
    sidebarOpen,
    setSidebarOpen,
    profile,
    updateProfile,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
