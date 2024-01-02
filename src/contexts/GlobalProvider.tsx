import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { getUsername, isValidToken } from "../services/storageService";
import { removeTokenFromBrowser } from "../services/storageService";
import Menu from "./Menu";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());
  const [username, setUsername] = useState<string>(getUsername());

  useEffect(() => {
    setIsLoggedIn(isValidToken());
  }, []);

  const logout = () => {
    removeTokenFromBrowser();
    setIsLoggedIn(false);
    setUsername("");
  };

  const globalValue = {
    selectedMenu,
    changeMenu: setSelectedMenu,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
