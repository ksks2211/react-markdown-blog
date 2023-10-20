import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "../api";

export default function useDeleteCategory(categoryId: string) {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}
