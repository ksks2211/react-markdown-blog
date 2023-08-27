// useGlobal.ts

import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export default useGlobal;
