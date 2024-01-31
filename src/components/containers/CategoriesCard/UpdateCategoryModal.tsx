import TextInputModal from "./CategoryInputModal";
import { useChangeCategory } from "../../../hooks/useCategory";
import { removeRootDir } from "../../../helpers/stringUtils";

export default function UpdateCategoryModal({
  fullCategoryName,
  categoryId,
  updateModalOpen,
  setUpdateModalOpen,
}: {
  fullCategoryName: string;
  updateModalOpen: boolean;

  categoryId: string;
  setUpdateModalOpen: (v: boolean) => void;
}) {
  const mutation = useChangeCategory();
  const categoryPath = removeRootDir(fullCategoryName);

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdateCategory = async (newCategory: string) => {
    await mutation.mutateAsync({ newCategory, categoryId });
  };
  return (
    <>
      <TextInputModal
        prompt={"Change category"}
        open={updateModalOpen}
        handleModalClose={closeUpdateModal}
        handleSubmit={handleUpdateCategory}
        label={`Current : ${categoryPath}`}
        placeholder="/new/category"
        regex={/^(\/\w+){1,7}$/}
        regexWarning="e.g. /category or /sub1/sub2"
      />
    </>
  );
}
