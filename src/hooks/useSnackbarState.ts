import type { AlertColor } from "@mui/material/Alert";
import { useCallback, useState } from "react";

const INITIAL_SNACKBAR_STATE = {
  open: false,
  severity: "error" as AlertColor,
  msg: "",
};

export function useErrorMessageSnackbarState() {
  const [snackbarState, setSnackbarState] = useState(INITIAL_SNACKBAR_STATE);

  const displaySnackbar = useCallback((msg: string) => {
    setSnackbarState((prev) => ({ ...prev, open: true, msg }));
  }, []);

  const closeSnackbar = useCallback((cb?: () => void) => {
    setSnackbarState((prev) => {
      if (cb && typeof cb === "function") {
        cb();
      }
      return { ...prev, open: false };
    });
  }, []);

  return {
    snackbarState,
    displaySnackbar,
    closeSnackbar,
  };
}
