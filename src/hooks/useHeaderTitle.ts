import { useContext, useEffect } from "react";
import HeaderTitleContext from "../contexts/HeaderTitleContext";

export const useHeaderTitle = () => {
  const context = useContext(HeaderTitleContext);
  return context;
};

export const useChangeTitle = (title: string) => {
  const { setTitle } = useHeaderTitle();
  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
};
