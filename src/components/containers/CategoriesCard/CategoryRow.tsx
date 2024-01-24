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
import { styled } from "@mui/material";

const StyledRowWithSubRows = styled("div")<{ depth: number }>`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  /* max-height: 1500px; */
  transition: height 0.4s;

  & > & {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

const StyledRow = styled("div")<{ rowOpen: boolean }>`
  transition: 0.4s;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: ${(props) => (props.rowOpen ? "3rem" : "0")};
  /* content-visibility: ${(props) =>
    props.rowOpen ? "visible" : "hidden"}; */
`;

export const CategoryRow: React.FC<CategoryRowProps> = ({
  categoryName,
  numOfAllPosts,
  numOfPosts,
  children,
  depth,
  numOfCategories,
  parentCategoryName,
  rows,
  rowOpen,
  subRowsOpen,
  setSubRowsOpen,
  // ...props
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
    rowRef.current?.classList.toggle(cx("closed"));

    if (!subRowsOpen) {
      Object.keys(rows).forEach((key) => {
        const rowRef = rows[key];

        if (fullCategoryName.startsWith(key) && fullCategoryName !== key) {
          // cur parent rows
          rowRef.setRowOpen(true);
          rowRef.setSubRowsOpen(true);
        } else if (parentCategoryName === rowRef.parentName) {
          // sibling rows
          rowRef.setRowOpen(true);
          rowRef.setSubRowsOpen(false);
        } else {
          // other rows
          rowRef.setRowOpen(false);
          rowRef.setSubRowsOpen(false);
        }

        // child row
        if (rowRef.parentName === fullCategoryName) {
          rowRef.setRowOpen(true);
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
      <StyledRowWithSubRows depth={depth} className={cx("rows-container")}>
        <StyledRow
          rowOpen={rowOpen}
          className={cx("row-wrapper", { closed: !subRowsOpen, marked })}
          ref={rowRef}
        >
          <div
            style={{
              display: "inline-flex",
              width: `${depth}rem`,
              height: "100%",
            }}
          />

          <div className={cx("category-details")}>
            {subRowsOpen ? (
              <FaRegFolderOpen className={cx("icon")} />
            ) : (
              <FaRegFolder className={cx("icon")} />
            )}
            {disabled || <span className={cx("count")}>{numOfPosts}</span>}

            <Link className={cx("dirname")} to={`/categories${categoryPath}`}>
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
