import { useMutation, useQueryClient } from "react-query";
import { deletePostById } from "../api";

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number, unknown>({
    mutationFn: deletePostById,
    onSuccess: (pid) => {
      queryClient.invalidateQueries(["post", pid]);
    },
  });
}
