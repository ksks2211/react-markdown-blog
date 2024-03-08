import { useMutation } from "react-query";
import { createImage } from "../services/uploadService";
import { useUpdateUserProfile } from "./useUser";
import useGlobal from "./useGlobal";

export function useCreateImage() {
  const mutation = useUpdateUserProfile();
  const { updateProfile } = useGlobal();
  return useMutation<{ id: string }, Error, File, unknown>({
    mutationFn: createImage,
    onSuccess({ id }) {
      mutation.mutate(id);
      updateProfile(id);
    },
  });
}
