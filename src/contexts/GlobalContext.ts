import { createContext } from "react";
import Menu from "./Menu";

interface GlobalContextType {
  selectedMenu: Menu;
  isLoggedIn: boolean;
  username: string;
  changeMenu: (e: Menu) => void;
  setIsLoggedIn: (v: boolean) => void;
  setUsername: (n: string) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;
