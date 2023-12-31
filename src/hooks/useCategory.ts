import { useMutation, useQuery, useQueryClient } from "react-query";
import { Categories, ChangeCategoryForm } from "../types/category.types";
import {
  changeCategory,
  createCategory,
  deleteCategory,
  getCategories,
} from "../services/categoryService";

export function useGetCategories() {
  return useQuery<Categories, Error>("categories", () => getCategories());
}
export function useChangeCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ChangeCategoryForm, unknown>({
    mutationFn: changeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, unknown>({
    mutationFn: (newCategory) => createCategory({ newCategory }),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
    // onError
  });
} //

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string, unknown>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
}
