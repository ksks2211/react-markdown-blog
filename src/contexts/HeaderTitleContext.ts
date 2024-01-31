import { createContext } from "react";

interface HeaderTitleContextType {
  title: string;
  setTitle: (v: string) => void;
}

const HeaderTitleContext = createContext<HeaderTitleContextType>({
  title: "",
  setTitle: () => {},
});

export default HeaderTitleContext;
