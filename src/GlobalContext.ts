import { isValidToken } from "./api/auth";
import { SelectedMenu } from "./constants";
import { createContext } from "react";

interface GlobalContextType {
  selectedMenu: SelectedMenu;
  changeMenu: (e: SelectedMenu) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedMenu: "HOME",
  changeMenu: () => {},
  isLoggedIn: isValidToken(),
  setIsLoggedIn: () => {},
  logout: () => {},
});

export default GlobalContext;
