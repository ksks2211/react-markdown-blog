import { CategoriesCardProps } from "./CategoriesCard.types";
import { NestedCategory } from "./NestedCategory";
import { cx } from "./config";

const CategoriesCard = ({
  rootCategory,
  closed = true,
  parentCategory = "",
}: CategoriesCardProps) => {
  return (
    <div className={cx("CategoriesCard")}>
      {Object.keys(rootCategory).map((categoryName) => {
        return (
          <NestedCategory
            parentCategory={parentCategory}
            closed={closed}
            depth={1}
            key={"root"}
            categoryName={categoryName}
            category={rootCategory[categoryName]}
          />
        );
      })}
    </div>
  );
};

export default CategoriesCard;
