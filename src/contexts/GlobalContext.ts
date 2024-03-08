import { createContext } from "react";
import Menu from "./Menu.enum";
import type { LoginSuccessResponse } from "@customTypes/auth.types";

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
  login: (data: LoginSuccessResponse) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  profile: string;
  updateProfile: (v: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export default GlobalContext;
