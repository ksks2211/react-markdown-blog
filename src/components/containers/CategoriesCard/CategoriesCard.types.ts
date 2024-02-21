import { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import type { Categories, SubCategory } from "@customTypes/category.types";

export interface RowType {
  [fullName: string]: {
    // rowOpen: boolean;
    subRowsOpen: boolean;
    // setRowOpen: (v: boolean) => void;
    setSubRowsOpen: (v: boolean) => void;
    parentName: string;
  };
}

interface CommonProps {
  setErrorMessage: (msg: string) => void;
}

export interface CategoryRowProps
  extends ComponentPropsWithRef<"div">,
    CommonProps {
  categoryName: string;
  parentCategoryName: string;
  depth: number;
  numOfPosts: number;
  numOfAllPosts: number;
  numOfCategories: number;
  rows: RowType;
  subRowsOpen: boolean;
  setSubRowsOpen: (v: boolean) => void;
}

export interface NestedCategoryProps
  extends ComponentPropsWithoutRef<"div">,
    CommonProps {
  categoryName: string;
  category: SubCategory;
  depth: number;
  parentCategory: string;
  rows: RowType;
  setRows: React.Dispatch<React.SetStateAction<RowType>>;
}

export interface CategoriesCardProps extends CommonProps {
  rootCategory: Categories;
  parentCategory?: string;
}
