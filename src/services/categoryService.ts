import blogApi from "../api/blogApi";
import type { ChangeCategoryForm } from "@customTypes/category.types";

const urlPrefix = "/api/categories";

// Categories
export const getCategories = async () => {
  const { data } = await blogApi.get(urlPrefix);
  return data;
};

export const getCategoryList = async () => {
  const { data } = await blogApi.get(`${urlPrefix}/list`);
  return data;
};

export async function createCategory({
  newCategory,
}: {
  newCategory: string;
}): Promise<void> {
  await blogApi.post(urlPrefix, { category: newCategory });
}

export async function deleteCategory(categoryId: string) {
  await blogApi.delete(`${urlPrefix}/${categoryId}`);
}

export async function changeCategory({
  categoryId,
  newCategory,
}: ChangeCategoryForm) {
  await blogApi.put(`${urlPrefix}/${categoryId}`, {
    category: newCategory,
  });
}
