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
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedMenu: Menu.HOME,
  isLoggedIn: false,
  username: "",
  displayName: "",
  changeMenu: () => {},
  setIsLoggedIn: () => {},
  setUsername: () => {},
  setDisplayName: () => {},
  logout: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export default GlobalContext;
