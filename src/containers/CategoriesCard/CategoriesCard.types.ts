import { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import { Categories, SubCategory } from "../../types/category.types";

export interface CategoryRowProps extends ComponentPropsWithRef<"div"> {
  categoryName: string;
  parentCategoryName: string;
  depth: number;
  numOfPosts: number;
  numOfAllPosts: number;
  numOfCategories: number;
  closed: boolean;
}

export interface NestedCategoryProps extends ComponentPropsWithoutRef<"div"> {
  categoryName: string;
  category: SubCategory;
  depth: number;
  parentCategory: string;
  closed?: boolean;
}

export interface CategoriesCardProps {
  // rootDir: RootDirectory;
  rootCategory: Categories;
  closed?: boolean;
  parentCategory?: string;
}
