import TextInputModal from "./CategoryInputModal";
import { useCreateCategory } from "../../../hooks/useCategory";
import { removeRootDir } from "../../../helpers/stringUtils";
import { useCallback, useEffect } from "react";

export default function AddNewCategoryModal({
  fullCategoryName,
  createModalOpen,
  setCreateModalOpen,
  handleOpenFolderAfterAddNewCategory,
  setErrorMessage,
}: {
  fullCategoryName: string;
  createModalOpen: boolean;
  setCreateModalOpen: (v: boolean) => void;
  handleOpenFolderAfterAddNewCategory: () => void;
  setErrorMessage: (msg: string) => void;
}) {
  const mutation = useCreateCategory();
  const categoryPath = removeRootDir(fullCategoryName);

  useEffect(() => {
    if (mutation.error !== null) {
      setErrorMessage(mutation.error.message || "Category Update Failed");
    }
  }, [mutation.error, setErrorMessage]);

  const closeCreateModal = useCallback(() => {
    setCreateModalOpen(false);
  }, [setCreateModalOpen]);

  const handleAddCategory = useCallback(
    async (value: string) => {
      const newCategory = `${categoryPath}/${value}`;
      await mutation.mutateAsync(newCategory);
      handleOpenFolderAfterAddNewCategory();
    },
    [categoryPath, handleOpenFolderAfterAddNewCategory, mutation]
  );

  return (
    <>
      {createModalOpen && (
        <TextInputModal
          prompt={`Add new category`}
          open={createModalOpen}
          handleModalClose={closeCreateModal}
          handleSubmit={handleAddCategory}
          label={categoryPath}
          isLoading={mutation.isLoading}
          placeholder="Sub_Category"
          regex={/^\w+$/}
          regexWarning="Only take alphanumeric values"
        />
      )}
    </>
  );
}
