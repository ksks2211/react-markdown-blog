import { useEffect, useState } from "react";
import { NestedCategoryProps } from "./CategoriesCard.types";
import { CategoryRow } from "./CategoryRow";

export const NestedCategory: React.FC<NestedCategoryProps> = ({
  parentCategory,
  categoryName,
  category,
  depth,
  rows,
  setRows,
}) => {
  const { subCategories, numOfPosts, numOfAllPosts } = category;
  const numOfCategories = Object.keys(subCategories).length;
  const fullCategoryName = `${parentCategory}/${categoryName}`;

  // const [rowOpen, setRowOpen] = useState<boolean>(depth < 3);
  const [subRowsOpen, setSubRowsOpen] = useState<boolean>(depth < 2);

  useEffect(() => {
    setRows((prev) => ({
      ...prev,
      [fullCategoryName]: {
        subRowsOpen: subRowsOpen,
        parentName: parentCategory,
        setSubRowsOpen: (v) => setSubRowsOpen(v),
      },
    }));
  }, [fullCategoryName, parentCategory, setRows, setSubRowsOpen, subRowsOpen]);

  return (
    <CategoryRow
      setSubRowsOpen={setSubRowsOpen}
      subRowsOpen={subRowsOpen}
      parentCategoryName={parentCategory}
      categoryName={categoryName}
      depth={depth}
      numOfPosts={numOfPosts}
      numOfAllPosts={numOfAllPosts}
      numOfCategories={numOfCategories}
      rows={rows}
      className="category-row"
    >
      {Object.keys(subCategories).map((subCategoryName) => (
        <NestedCategory
          rows={rows}
          setRows={setRows}
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
