import { createContext } from "react";
import Menu from "./Menu.enum";

interface GlobalContextType {
  selectedMenu: Menu;
  isLoggedIn: boolean;
  username: string;
  displayName: string;
  changeMenu: (e: Menu) => void;
  setIsLoggedIn: (v: boolean) => void;
  setUsername: (n: string) => void;
  setDisplayName: (n: string) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;
