import useDeleteCategory from "../../hooks/useDeleteCategory";
import { useRef, useState } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

import styles from "./CategoriesCard.module.scss";
import cn from "classnames/bind";

import { Link } from "react-router-dom";
import { convertSlashesToDashes, removeDash } from "../../helpers/stringUtils";
import TextInputModal from "./TextInputModal";
import useCreateCategory from "../../hooks/useCreateCategory";
import {
  CategoriesCardProps,
  CategoryRowProps,
  NestedCategoryProps,
} from "./CategoriesCard.types";
import useChangeCategory from "../../hooks/useChangeCategory";

const cx = cn.bind(styles);

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

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const categoryId = convertSlashesToDashes(fullCategoryName);
  const deleteCategoryMutation = useDeleteCategory();
  const createCategoryMutation = useCreateCategory();
  const changeCategoryMutation = useChangeCategory();

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const canToggle = numOfCategories !== 0;
  const marked = depth === 1;
  //
  const disabled = numOfPosts === 0;

  // Category removable
  const removable = disabled && !canToggle;

  if (depth === 1) {
    closed = false;
  }

  const rowRef = useRef<HTMLDivElement>(null);

  const toggleCategory = () => {
    rowRef.current?.classList.toggle(cx("closed"));
    // const fullName = rowRef.current?.dataset.fullName;
    // console.log(fullName);
  };

  const removeCategory = async () => {
    await deleteCategoryMutation.mutateAsync(categoryId);
  };

  const submitAdd = async (value: string) => {
    const categoryArray = fullCategoryName.split("/");
    categoryArray.splice(1, 1);
    categoryArray.push(value);
    const newCategory = categoryArray.join("/");
    await createCategoryMutation.mutateAsync(newCategory);
  };

  const submitChange = async (newCategory: string) => {
    console.log(newCategory);
    console.log(categoryId);

    await changeCategoryMutation.mutateAsync({ newCategory, categoryId });
  };

  return (
    <>
      <div className={cx("row-container")}>
        <div className={cx("row-wrapper", { closed, marked })} ref={rowRef}>
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
            {disabled || <span className={cx("count")}>{numOfPosts}</span>}

            <Link
              className={cx("dirname", { disabled })}
              to={`/categories/${categoryId}`}
              onClick={(e) => e.stopPropagation()}
            >
              {removeDash(categoryName)}
            </Link>

            <AiFillPlusCircle
              className={cx("icon", "icon-sm", "add-icon")}
              onClick={openCreateModal}
            />

            {!disabled && depth !== 0 && (
              <FaPen
                className={cx("icon", "icon-sm", "change-icon")}
                onClick={openUpdateModal}
              />
            )}

            {removable && (
              <MdDelete
                className={cx("icon", "icon-sm", "delete-icon")}
                onClick={removeCategory}
              />
            )}
          </div>

          <span className={cx("details")}>{`(${numOfAllPosts})`}</span>

          {canToggle && (
            <div className={cx("dropdown")} onClick={toggleCategory}>
              <RiArrowDropDownLine className={cx("dropdown-icon")} />
            </div>
          )}
        </div>

        {children}
      </div>

      {createModalOpen && (
        <TextInputModal
          prompt={`Add new category`}
          open={createModalOpen}
          onClose={closeCreateModal}
          onSubmit={submitAdd}
          label={fullCategoryName}
        />
      )}

      {updateModalOpen && (
        <TextInputModal
          prompt={"Change category"}
          open={updateModalOpen}
          onClose={closeUpdateModal}
          onSubmit={submitChange}
          label={fullCategoryName}
          placeholder={`/${fullCategoryName.split("/").slice(2).join("/")}`}
        />
      )}
    </>
  );
};

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
