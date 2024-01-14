import { useMutation } from "react-query";
import { createUser } from "../services/authService";

interface CreateUserForm {
  username: string;
  password: string;
  email: string;
}

export function useCreateUser() {
  return useMutation<void, Error, CreateUserForm, unknown>({
    mutationFn: ({ username, password, email }) =>
      createUser({ username, password, email }),
  });
}
