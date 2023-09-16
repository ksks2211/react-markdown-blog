import { SelectedMenu } from "../constants";
import { createContext } from "react";

interface GlobalContextType {
  selectedMenu: SelectedMenu;
  isLoggedIn: boolean;
  changeMenu: (e: SelectedMenu) => void;
  setIsLoggedIn: (v: boolean) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;
