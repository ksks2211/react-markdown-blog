import { useCallback } from "react";

export function useEnterKeyPressHandler(callback: () => void) {
  const enterKeyPressHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && typeof callback === "function") {
        callback();
      }
    },
    [callback]
  );
  return { enterKeyPressHandler };
}
