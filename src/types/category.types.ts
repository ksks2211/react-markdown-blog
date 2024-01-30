// Categories
export interface ChangeCategoryForm {
  categoryId: string;
  newCategory: string;
}

export interface SubCategory {
  subCategories: { [key: string]: SubCategory };
  numOfPosts: number;
  numOfAllPosts: number;
}

export interface Categories {
  [key: string]: SubCategory;
}

export interface CategoryList {
  categories: string[];
}
