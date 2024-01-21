import {
  useDeleteCategory,
  useCreateCategory,
  useChangeCategory,
} from "../../../hooks/useCategory";

import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import {
  convertSlashesToDashes,
  removeDash,
} from "../../../helpers/stringUtils";
import TextInputModal from "../../common/TextInputModal";
import { CategoryRowProps } from "./CategoriesCard.types";
import { cx } from "./config";

import { FaRegFolder, FaRegFolderOpen, FaPen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

export const CategoryRow: React.FC<CategoryRowProps> = ({
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
  };

  const handleRemoveCategory = async () => {
    await deleteCategoryMutation.mutateAsync(categoryId);
  };

  const handleAddCategory = async (value: string) => {
    const categoryArray = fullCategoryName.split("/");
    categoryArray.splice(1, 1);
    categoryArray.push(value);
    const newCategory = categoryArray.join("/");
    await createCategoryMutation.mutateAsync(newCategory);
  };

  const handleUpdateCategory = async (newCategory: string) => {
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
              className={cx("dirname")}
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
                onClick={handleRemoveCategory}
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
          onSubmit={handleAddCategory}
          label={fullCategoryName}
        />
      )}

      {updateModalOpen && (
        <TextInputModal
          prompt={"Change category"}
          open={updateModalOpen}
          onClose={closeUpdateModal}
          onSubmit={handleUpdateCategory}
          label={fullCategoryName}
          placeholder={`/${fullCategoryName.split("/").slice(2).join("/")}`}
        />
      )}
    </>
  );
};
