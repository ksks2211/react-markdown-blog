import { useContext, useEffect } from "react";

import Menu from "../contexts/Menu.enum";
import GlobalContext from "../contexts/GlobalContext";
import { UnauthorizedError } from "../errors";

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

const useLogoutIfUnauthorizedError = (e: unknown) => {
  const { logout } = useGlobal();
  if (e instanceof UnauthorizedError) {
    logout();
  }
};

export { useChangeMenu, useUsername, useLogoutIfUnauthorizedError };

export default useGlobal;
