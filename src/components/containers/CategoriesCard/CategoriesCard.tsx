import { useState } from "react";
import { CategoriesCardProps, RowType } from "./CategoriesCard.types";
import { NestedCategory } from "./NestedCategory";
import { cx } from "./config";
import { styled } from "@mui/material";
import { rgba } from "polished";

const StyledCategoriesCard = styled("div")`
  border-radius: 0.4rem;
  box-shadow: 0 1px 2px ${rgba(84, 83, 83, 0.1)},
    0 2px 1px ${rgba(0, 0, 0, 0.1)};
  padding: 0;
  display: flex;
  flex-flow: column;
  color: ${(props) => props.theme.palette.grey[800]};
`;

const CategoriesCard = ({
  rootCategory,
  parentCategory = "",
}: CategoriesCardProps) => {
  const [rows, setRows] = useState<RowType>({});

  return (
    <StyledCategoriesCard className={cx("CategoriesCard")}>
      {Object.keys(rootCategory).map((categoryName) => {
        return (
          <NestedCategory
            rows={rows}
            setRows={setRows}
            parentCategory={parentCategory}
            depth={1}
            key={"root"}
            categoryName={categoryName}
            category={rootCategory[categoryName]}
          />
        );
      })}
    </StyledCategoriesCard>
  );
};

export default CategoriesCard;
