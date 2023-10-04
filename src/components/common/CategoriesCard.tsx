import { ComponentPropsWithRef, ComponentPropsWithoutRef, useRef } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import styles from "./CategoriesCard.module.scss";
import cn from "classnames/bind";
import { Link } from "react-router-dom";
import { removeDash } from "../../helpers/stringUtils";
import { Categories, SubCategory } from "../../types/post.types";

const cx = cn.bind(styles);

interface CategoryRowProps extends ComponentPropsWithRef<"div"> {
  categoryName: string;
  parentCategoryName: string;
  depth: number;
  numOfPosts: number;
  numOfAllPosts: number;
  numOfCategories: number;
  closed: boolean;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  categoryName,
  numOfAllPosts,
  numOfPosts,
  children,
  depth,
  numOfCategories,
  parentCategoryName,
  closed,
  // ...props
}) => {
  const fullCategoryName = `${parentCategoryName}/${categoryName}`;

  const canToggle = numOfCategories !== 0;
  const marked = depth === 1;
  // Link disabled
  const disabled = numOfPosts === 0;

  // Category removable
  const removable = disabled && !canToggle;

  if (depth === 1) {
    closed = false;
  }

  const rowRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    rowRef.current?.classList.toggle(cx("closed"));
    const fullName = rowRef.current?.dataset.fullName;
    console.log(fullName);
  };

  return (
    <div className={cx("row-container")}>
      <div
        className={cx("row-wrapper", { closed, marked })}
        ref={rowRef}
        data-full-name={fullCategoryName}
        // onClick={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        // }}
      >
        <div
          style={{
            display: "inline-flex",
            width: `${depth}rem`,
            height: "100%",
          }}
        />

        <div className={cx("category-details")}>
          {<FaRegFolderOpen className={cx("icon", "open-folder")} />}
          {<FaRegFolder className={cx("icon", "closed-folder")} />}
          {!numOfPosts || <span className={cx("count")}>{numOfPosts}</span>}

          <Link
            className={cx("dirname", { disabled })}
            to={`/categories${fullCategoryName}`}
            onClick={(e) => e.stopPropagation()}
          >
            {removeDash(categoryName)}
          </Link>

          {removable && <MdDelete className={cx("icon", "delete-icon")} />}
        </div>

        <span className={cx("details")}>{`(${numOfAllPosts})`}</span>

        {canToggle && (
          <div className={cx("dropdown")} onClick={onClick}>
            <RiArrowDropDownLine className={cx("dropdown-icon")} />
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

interface NestedCategoryProps extends ComponentPropsWithoutRef<"div"> {
  categoryName: string;
  category: SubCategory;
  depth: number;
  parentCategory: string;
  closed?: boolean;
}

const NestedCategory: React.FC<NestedCategoryProps> = ({
  parentCategory,
  categoryName,
  category,
  depth,
  closed = false,
}) => {
  const subCategories = category.subCategories;

  const numOfCategories = Object.keys(subCategories).length;
  const numOfPosts = category.numOfPosts;
  const numOfAllPosts = category.numOfAllPosts;
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

interface CategoriesCardProps {
  // rootDir: RootDirectory;
  rootCategory: Categories;
  closed?: boolean;
  parentCategory?: string;
}

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
