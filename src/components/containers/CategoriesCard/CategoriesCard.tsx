import { useState } from "react";
import type { CategoriesCardProps, RowType } from "./CategoriesCard.types";
import { NestedCategory } from "./NestedCategory";
import { StyledCategoriesCard } from "./CategoriesCard.styles";

const CategoriesCard = ({
  rootCategory,
  parentCategory = "",
  setErrorMessage,
}: CategoriesCardProps) => {
  const [rows, setRows] = useState<RowType>({});

  return (
    <StyledCategoriesCard>
      {Object.keys(rootCategory).map((categoryName) => {
        return (
          <NestedCategory
            rows={rows}
            setRows={setRows}
            parentCategory={parentCategory}
            depth={1}
            key="root"
            categoryName={categoryName}
            category={rootCategory[categoryName]}
            setErrorMessage={setErrorMessage}
          />
        );
      })}
    </StyledCategoriesCard>
  );
};

export default CategoriesCard;
