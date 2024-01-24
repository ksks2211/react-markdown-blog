import { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import { Categories, SubCategory } from "../../../types/category.types";

export interface RowType {
  [fullName: string]: {
    rowOpen: boolean;
    subRowsOpen: boolean;
    setRowOpen: (v: boolean) => void;
    setSubRowsOpen: (v: boolean) => void;
    parentName: string;
  };
}

export interface CategoryRowProps extends ComponentPropsWithRef<"div"> {
  categoryName: string;
  parentCategoryName: string;
  depth: number;
  numOfPosts: number;
  numOfAllPosts: number;
  numOfCategories: number;
  rows: RowType;
  rowOpen: boolean;
  subRowsOpen: boolean;
  setRowOpen: (v: boolean) => void;
  setSubRowsOpen: (v: boolean) => void;
}

export interface NestedCategoryProps extends ComponentPropsWithoutRef<"div"> {
  categoryName: string;
  category: SubCategory;
  depth: number;
  parentCategory: string;
  rows: RowType;
  setRows: React.Dispatch<React.SetStateAction<RowType>>;
}

export interface CategoriesCardProps {
  // rootDir: RootDirectory;
  rootCategory: Categories;
  parentCategory?: string;
}
