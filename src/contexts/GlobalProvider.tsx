import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import {
  getUsername,
  isValidToken,
  removeTokenFromBrowser,
  getDisplayName,
} from "../services/storageService";
import Menu from "./Menu.enum";
import { useRemoveRefreshToken } from "../hooks/useToken";
import throttle from "lodash-es/throttle";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());
  const [username, setUsername] = useState<string>(getUsername());
  const [displayName, setDisplayName] = useState<string>(getDisplayName());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mutation = useRemoveRefreshToken();

  useEffect(() => {
    setIsLoggedIn(isValidToken());
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
    removeTokenFromBrowser();
  }, 3000);

  const globalValue = {
    selectedMenu,
    changeMenu: setSelectedMenu,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    logout,
    displayName,
    setDisplayName,
    sidebarOpen,
    setSidebarOpen,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
