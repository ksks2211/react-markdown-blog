import blogApi from "../api/blogApi";
import { ChangeCategoryForm } from "../types/category.types";

// Categories
export const getCategories = async () => {
  const { data } = await blogApi.get("/categories");
  return data;
};

export async function createCategory({
  newCategory,
}: {
  newCategory: string;
}): Promise<void> {
  await blogApi.post("/categories", { category: newCategory });
}

export async function deleteCategory(categoryId: string) {
  await blogApi.delete(`/categories/${categoryId}`);
}

export async function changeCategory({
  categoryId,
  newCategory,
}: ChangeCategoryForm) {
  await blogApi.put(`/categories/${categoryId}`, {
    category: newCategory,
  });
}
