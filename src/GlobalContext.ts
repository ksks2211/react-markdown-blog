import { SelectedMenu } from "./constants";
import { createContext } from "react";

interface GlobalContextType {
  selectedMenu: SelectedMenu;
  changeMenu: (e: SelectedMenu) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  selectedMenu: "HOME",
  changeMenu: () => {},
});

export default GlobalContext;
