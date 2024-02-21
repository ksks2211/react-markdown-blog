import { useContext, useEffect } from "react";

import Menu from "../contexts/Menu.enum";
import GlobalContext from "../contexts/GlobalContext";

const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

const useChangeMenu = (selectedMenu: Menu) => {
  const { changeMenu } = useGlobal();

  useEffect(() => {
    changeMenu(selectedMenu);
  }, [changeMenu, selectedMenu]);
};

const useUsername = () => {
  const { username } = useGlobal();
  return username;
};

export { useChangeMenu, useUsername };

export default useGlobal;
