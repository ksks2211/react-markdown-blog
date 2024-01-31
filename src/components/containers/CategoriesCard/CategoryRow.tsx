import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  convertSlashesToDashes,
  removeDash,
} from "../../../helpers/stringUtils";
import type { CategoryRowProps } from "./CategoriesCard.types";

import { FaRegFolder, FaRegFolderOpen, FaPen } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  StyledRowWithSubRows,
  StyledRow,
  StyledCategoryDropdownBtn,
  StyledCategoryTitle,
} from "./CategoriesCard.styles";
import cn from "classnames";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import AddNewCategoryModal from "./AddNewCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";

function getFlags(numOfCategories: number, depth: number, numOfPosts: number) {
  const canToggle = numOfCategories !== 0;
  const isHighlighted = depth === 1;
  const havePosts = numOfPosts === 0;
  const canRemove = havePosts && !canToggle;
  const canUpdate = !havePosts && depth !== 1;

  return {
    canToggle,
    isHighlighted,
    havePosts,
    canRemove,
    canUpdate,
  };
}

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

  const categoryPath = fullCategoryName.split("/").splice(2).join("/");
  const categoryId = convertSlashesToDashes(fullCategoryName);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const { canToggle, isHighlighted, havePosts, canRemove, canUpdate } = useMemo(
    () => getFlags(numOfCategories, depth, numOfPosts),
    [depth, numOfCategories, numOfPosts]
  );

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

  const linkAddr = isHighlighted
    ? "/categories"
    : numOfPosts === 0
    ? `/posts/create?category=/${categoryPath}&empty=true`
    : `/categories/${categoryPath}`;

  return (
    <>
      <StyledRowWithSubRows depth={depth} className="rows-container">
        <StyledRow
          className={cn("row-wrapper", { "row-close": !subRowsOpen })}
          ref={rowRef}
          marked={isHighlighted}
          subRowsOpen={subRowsOpen}
          depth={depth}
        >
          <StyledCategoryTitle>
            {subRowsOpen ? (
              <FaRegFolderOpen className="folder-icon" />
            ) : (
              <FaRegFolder className="folder-icon" />
            )}
            {havePosts || <span className="count">{numOfPosts}</span>}

            <Link className={"category-name"} to={linkAddr}>
              {removeDash(categoryName)}
            </Link>

            <AiFillPlusCircle
              className="update-icon"
              onClick={openCreateModal}
            />

            {canUpdate && (
              <FaPen className="update-icon" onClick={openUpdateModal} />
            )}

            {canRemove && <DeleteCategoryBtn categoryId={categoryId} />}
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
        <AddNewCategoryModal
          createModalOpen={createModalOpen}
          fullCategoryName={fullCategoryName}
          setCreateModalOpen={setCreateModalOpen}
          handleOpenFolderAfterAddNewCategory={() => setSubRowsOpen(true)}
        />
      )}

      {updateModalOpen && (
        <UpdateCategoryModal
          categoryId={categoryId}
          fullCategoryName={fullCategoryName}
          setUpdateModalOpen={setUpdateModalOpen}
          updateModalOpen={updateModalOpen}
        />
      )}
    </>
  );
};
