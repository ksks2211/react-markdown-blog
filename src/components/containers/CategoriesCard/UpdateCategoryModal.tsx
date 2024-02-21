import TextInputModal from "./CategoryInputModal";
import { useChangeCategory } from "../../../hooks/useCategory";
import { removeRootDir } from "../../../helpers/stringUtils";
import { useEffect } from "react";

export default function UpdateCategoryModal({
  fullCategoryName,
  categoryId,
  updateModalOpen,
  setUpdateModalOpen,
  setErrorMessage,
}: {
  fullCategoryName: string;
  updateModalOpen: boolean;
  setErrorMessage: (msg: string) => void;
  categoryId: string;
  setUpdateModalOpen: (v: boolean) => void;
}) {
  const mutation = useChangeCategory();
  const categoryPath = removeRootDir(fullCategoryName);

  useEffect(() => {
    if (mutation.error !== null) {
      setErrorMessage(mutation.error.message || "Category Update Failed");
    }
  }, [mutation.error, setErrorMessage]);

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
