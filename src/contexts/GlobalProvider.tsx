import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import {
  getUsername,
  isValidToken,
  removeTokenFromBrowser,
  getDisplayName,
} from "../services/storageService";
import Menu from "./Menu.enum";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());
  const [username, setUsername] = useState<string>(getUsername());
  const [displayName, setDisplayName] = useState<string>(getDisplayName());

  useEffect(() => {
    setIsLoggedIn(isValidToken());
  }, []);

  const logout = () => {
    removeTokenFromBrowser();
    setIsLoggedIn(false);
    setUsername("");
    setDisplayName("");
  };

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
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
