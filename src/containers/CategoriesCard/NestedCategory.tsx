import { NestedCategoryProps } from "./CategoriesCard.types";
import { CategoryRow } from "./CategoryRow";

export const NestedCategory: React.FC<NestedCategoryProps> = ({
  parentCategory,
  categoryName,
  category,
  depth,
  closed = false,
}) => {
  const { subCategories, numOfPosts, numOfAllPosts } = category;
  const numOfCategories = Object.keys(subCategories).length;
  const fullCategoryName = `${parentCategory}/${categoryName}`;

  return (
    <CategoryRow
      closed={closed}
      parentCategoryName={parentCategory}
      categoryName={categoryName}
      depth={depth}
      numOfPosts={numOfPosts}
      numOfAllPosts={numOfAllPosts}
      numOfCategories={numOfCategories}
    >
      {Object.keys(subCategories).map((subCategoryName) => (
        <NestedCategory
          closed={closed}
          parentCategory={fullCategoryName}
          depth={depth + 1}
          key={`${fullCategoryName}/${subCategoryName}`}
          categoryName={subCategoryName}
          category={subCategories[subCategoryName]}
        />
      ))}
    </CategoryRow>
  );
};
