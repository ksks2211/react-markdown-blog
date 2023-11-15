import { SelectedMenu } from "../constants";
import { createContext } from "react";

interface GlobalContextType {
  selectedMenu: SelectedMenu;
  isLoggedIn: boolean;
  username: string;
  changeMenu: (e: SelectedMenu) => void;
  setIsLoggedIn: (v: boolean) => void;
  setUsername: (n: string) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;
