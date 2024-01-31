import { useState } from "react";
import HeaderTitleContext from "./HeaderTitleContext";

interface HeaderTitleProviderProps {
  children: React.ReactNode;
}

const HeaderTitleProvider: React.FC<HeaderTitleProviderProps> = ({
  children,
}) => {
  const [title, setTitle] = useState("");

  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export default HeaderTitleProvider;
