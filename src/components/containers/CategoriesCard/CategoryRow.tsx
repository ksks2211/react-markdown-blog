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

import { FaRegFolder, FaRegFolderOpen, FaPen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {
  StyledRowWithSubRows,
  StyledRow,
  StyledCategoryDropdownBtn,
  StyledCategoryTitle,
} from "./CategoriesCard.styles";
import cn from "classnames";

export const CategoryRow: React.FC<CategoryRowProps> = ({
  categoryName,
  numOfAllPosts,
  numOfPosts,
  children,
  depth,
  numOfCategories,
  parentCategoryName,
  rows,
  subRowsOpen,
  setSubRowsOpen,
}) => {
  const fullCategoryName = `${parentCategoryName}/${categoryName}`;

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const categoryId = convertSlashesToDashes(fullCategoryName);
  const categoryPath = depth !== 1 ? `/${categoryId}` : "";
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
  const disabled = numOfPosts === 0;

  // Category removable
  const removable = disabled && !canToggle;

  const rowRef = useRef<HTMLDivElement>(null);

  const toggleCategory = () => {
    if (!subRowsOpen) {
      Object.keys(rows).forEach((key) => {
        const rowRef = rows[key];

        if (fullCategoryName.startsWith(key) && fullCategoryName !== key) {
          rowRef.setSubRowsOpen(true);
        } else if (parentCategoryName === rowRef.parentName) {
          rowRef.setSubRowsOpen(false);
        } else {
          rowRef.setSubRowsOpen(false);
        }

        // child row
        if (rowRef.parentName === fullCategoryName) {
          rowRef.setSubRowsOpen(false);
        }
      });
      setSubRowsOpen(true);
    } else {
      setSubRowsOpen(false);
    }
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
      <StyledRowWithSubRows depth={depth} className="rows-container">
        <StyledRow
          className={cn("row-wrapper", { "row-close": !subRowsOpen })}
          ref={rowRef}
          marked={marked}
          subRowsOpen={subRowsOpen}
          depth={depth}
        >
          <StyledCategoryTitle>
            {subRowsOpen ? (
              <FaRegFolderOpen className="folder-icon" />
            ) : (
              <FaRegFolder className="folder-icon" />
            )}
            {disabled || <span className="count">{numOfPosts}</span>}

            <Link className={"category-name"} to={`/categories${categoryPath}`}>
              {removeDash(categoryName)}
            </Link>

            <AiFillPlusCircle
              className="update-icon"
              onClick={openCreateModal}
            />

            {!disabled && depth !== 0 && (
              <FaPen className="update-icon" onClick={openUpdateModal} />
            )}

            {removable && (
              <MdDelete
                className="delete-icon"
                onClick={handleRemoveCategory}
              />
            )}
          </StyledCategoryTitle>

          <StyledCategoryDropdownBtn
            subRowsOpen={subRowsOpen}
            canToggle={canToggle}
          >
            <span className="category-posts-count">{`(${numOfAllPosts})`}</span>

            <div className="arrow" onClick={toggleCategory}>
              <RiArrowDropDownLine className="arrow-icon" />
            </div>
          </StyledCategoryDropdownBtn>
        </StyledRow>

        {children}
      </StyledRowWithSubRows>

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
