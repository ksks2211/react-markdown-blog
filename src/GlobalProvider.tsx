import { useState } from "react";
import { SelectedMenu } from "./constants";
import GlobalContext from "./GlobalContext";

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>("HOME");
  const globalValue = {
    selectedMenu,
    changeMenu: (menu: SelectedMenu) => {
      setSelectedMenu(menu);
    },
  };
  return (
    <GlobalContext.Provider value={globalValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
