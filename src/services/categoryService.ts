import blogApi from "../api/blogApi";
import type {
  Categories,
  CategoryList,
  ChangeCategoryForm,
} from "@customTypes/category.types";

const CATEGORY_PREFIX = "/api/categories";

// Categories
export const getCategories = async () => {
  const { data } = await blogApi.get(CATEGORY_PREFIX);
  return data as Categories;
};

export const getCategoryList = async () => {
  const { data } = await blogApi.get(`${CATEGORY_PREFIX}/list`);
  return data as CategoryList;
};

export async function createCategory(newCategory: string): Promise<void> {
  await blogApi.post(CATEGORY_PREFIX, { category: newCategory });
}

export async function deleteCategory(categoryId: string) {
  await blogApi.delete(`${CATEGORY_PREFIX}/${categoryId}`);
}

export async function changeCategory({
  categoryId,
  newCategory,
}: ChangeCategoryForm) {
  await blogApi.put(`${CATEGORY_PREFIX}/${categoryId}`, {
    category: newCategory,
  });
}
