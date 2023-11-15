import { useMutation } from "react-query";
import { createUser } from "../api";

interface CreateUserForm {
  username: string;
  password: string;
  email: string;
}

export default function useCreateUser() {
  return useMutation<void, Error, CreateUserForm, unknown>({
    mutationFn: ({ username, password, email }) =>
      createUser(username, password, email),
  });
}
