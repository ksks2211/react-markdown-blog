import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "../api";

//
export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string, unknown>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}
