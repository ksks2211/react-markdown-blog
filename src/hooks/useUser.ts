import { useMutation } from "react-query";
import { createUser } from "../services/authService";
import type { RegisterUserForm } from "@customTypes/auth.types";

export function useCreateUser(setErrorMessage: (msg: string | null) => void) {
  return useMutation<void, Error, RegisterUserForm, unknown>({
    mutationFn: ({ username, password, email }) =>
      createUser({ username, password, email }),
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}
