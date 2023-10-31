import { useMutation, useQueryClient } from "react-query";
import { ChangeCategoryForm } from "../types/post.types";
import { changeCategory } from "../api";

export default function useChangeCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ChangeCategoryForm, unknown>({
    mutationFn: changeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}
