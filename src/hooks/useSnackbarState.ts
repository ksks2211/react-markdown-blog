import type { AlertColor } from "@mui/material/Alert";
import { useCallback, useEffect, useState } from "react";

const INITIAL_SNACKBAR_STATE = {
  open: false,
  severity: "error" as AlertColor,
  msg: "",
};

export function useSnackbarState() {
  const [snackbarState, setSnackbarState] = useState(INITIAL_SNACKBAR_STATE);

  const closeSnackbar = (cb?: () => void) => {
    setSnackbarState((prev) => {
      if (cb) {
        cb();
      }
      return { ...prev, open: false };
    });
  };

  const displaySnackbar = (msg: string) => {
    setSnackbarState((prev) => ({ ...prev, open: true, msg }));
  };
  return { snackbarState, displaySnackbar, closeSnackbar };
}

export function useErrorMessageSnackbarState() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarState, setSnackbarState] = useState(INITIAL_SNACKBAR_STATE);

  const displaySnackbar = useCallback((msg: string) => {
    setSnackbarState((prev) => ({ ...prev, open: true, msg }));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      displaySnackbar(errorMessage);
      setErrorMessage(null);
    }
  }, [displaySnackbar, errorMessage]);

  const closeSnackbar = (cb?: () => void) => {
    setSnackbarState((prev) => {
      if (cb) {
        cb();
      }
      return { ...prev, open: false };
    });
  };

  return {
    snackbarState,
    displaySnackbar,
    closeSnackbar,
    errorMessage,
    setErrorMessage,
  };
}
