import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { convertSlashesToDashes } from "../../../helpers/stringUtils";
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
import useGlobal from "../../../hooks/useGlobal";

function getFlags(numOfCategories: number, depth: number, numOfPosts: number) {
  const canToggle = numOfCategories !== 0;
  const isRoot = depth === 1;
  const havePosts = numOfPosts === 0;
  const canRemove = havePosts && !canToggle && !isRoot;
  const canUpdate = !havePosts && !isRoot;

  return {
    canToggle,
    isRoot,
    havePosts,
    canRemove,
    canUpdate,
  };
}

function generateCategory(parentCategoryName: string, categoryName: string) {
  const fullCategoryName = `${parentCategoryName}/${categoryName}`;
  const categoryPath = fullCategoryName.split("/").splice(2).join("/");
  const categoryId = convertSlashesToDashes(fullCategoryName);

  return {
    fullCategoryName,
    categoryPath,
    categoryId,
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
  setErrorMessage,
}) => {
  const { displayName } = useGlobal();
  const rowRef = useRef<HTMLDivElement>(null);

  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const { fullCategoryName, categoryPath, categoryId } = useMemo(
    () => generateCategory(parentCategoryName, categoryName),
    [categoryName, parentCategoryName]
  );

  const { canToggle, isRoot, havePosts, canRemove, canUpdate } = useMemo(
    () => getFlags(numOfCategories, depth, numOfPosts),
    [depth, numOfCategories, numOfPosts]
  );

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleOpenFolderAfterAddNewCategory = () => {
    setSubRowsOpen(true);
  };

  const toggleCategory = useCallback(() => {
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
  }, [fullCategoryName, parentCategoryName, rows, setSubRowsOpen, subRowsOpen]);

  const linkAddr = isRoot
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
          marked={isRoot}
          subRowsOpen={subRowsOpen}
          depth={depth}
        >
          <StyledCategoryTitle depth={depth}>
            {subRowsOpen ? (
              <FaRegFolderOpen className="folder-icon" />
            ) : (
              <FaRegFolder className="folder-icon" />
            )}
            {havePosts || <span className="count">{numOfPosts}</span>}

            <Link className={"category-name"} to={linkAddr}>
              {isRoot ? displayName : categoryName}
            </Link>

            <AiFillPlusCircle
              className="update-icon"
              onClick={openCreateModal}
            />

            {canUpdate && (
              <FaPen className="update-icon" onClick={openUpdateModal} />
            )}

            {canRemove && (
              <DeleteCategoryBtn
                setErrorMessage={setErrorMessage}
                categoryId={categoryId}
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
        <AddNewCategoryModal
          setErrorMessage={setErrorMessage}
          createModalOpen={createModalOpen}
          fullCategoryName={fullCategoryName}
          setCreateModalOpen={setCreateModalOpen}
          handleOpenFolderAfterAddNewCategory={
            handleOpenFolderAfterAddNewCategory
          }
        />
      )}

      {updateModalOpen && (
        <UpdateCategoryModal
          setErrorMessage={setErrorMessage}
          categoryId={categoryId}
          fullCategoryName={fullCategoryName}
          setUpdateModalOpen={setUpdateModalOpen}
          updateModalOpen={updateModalOpen}
        />
      )}
    </>
  );
};
