import TextInputModal from "./CategoryInputModal";
import { useCreateCategory } from "../../../hooks/useCategory";
import { removeRootDir } from "../../../helpers/stringUtils";

export default function AddNewCategoryModal({
  fullCategoryName,
  createModalOpen,
  setCreateModalOpen,
  handleOpenFolderAfterAddNewCategory,
}: {
  fullCategoryName: string;
  createModalOpen: boolean;
  setCreateModalOpen: (v: boolean) => void;
  handleOpenFolderAfterAddNewCategory: () => void;
}) {
  const mutation = useCreateCategory();
  const categoryPath = removeRootDir(fullCategoryName);

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };
  const handleAddCategory = async (value: string) => {
    const newCategory = `${categoryPath}/${value}`;
    await mutation.mutateAsync(newCategory);
    handleOpenFolderAfterAddNewCategory();
  };

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
