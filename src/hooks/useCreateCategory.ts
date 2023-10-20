import { useMutation, useQueryClient } from "react-query";
import { createCategory } from "../api";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, unknown>({
    mutationFn: (newCategory) => createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
    // onError
  });
}
