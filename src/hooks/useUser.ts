import { useMutation } from "react-query";
import { createUser, updateUserProfileImageId } from "../services/authService";
import type { RegisterUserForm } from "@customTypes/auth.types";

export function useCreateUser(setErrorMessage: (msg: string) => void) {
  return useMutation<void, Error, RegisterUserForm, unknown>({
    mutationFn: ({ username, password, email }) =>
      createUser({ username, password, email }),
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateUserProfileImageId() {
  return useMutation<void, Error, number, unknown>({
    mutationFn: updateUserProfileImageId,
  });
}
