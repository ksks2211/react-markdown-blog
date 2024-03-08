import { useCallback } from "react";

export function useEnterKeyPressHandler(callback: () => void) {
  const enterKeyPressHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && typeof callback === "function") {
        event.preventDefault();
        callback();
      }
    },
    [callback]
  );
  return { enterKeyPressHandler };
}
