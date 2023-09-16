import { useEffect, useState } from "react";
import { SelectedMenu } from "../constants";
import GlobalContext from "./GlobalContext";
import { isValidToken, removeTokenFromBrowser } from "../api/auth";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>("HOME");
  const [isLoggedIn, setIsLoggedIn] = useState(isValidToken());

  useEffect(() => {
    setIsLoggedIn(isValidToken());
  }, []);

  const logout = () => {
    removeTokenFromBrowser();
    setIsLoggedIn(false);
  };

  const globalValue = {
    selectedMenu,
    changeMenu: (menu: SelectedMenu) => {
      setSelectedMenu(menu);
    },
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
