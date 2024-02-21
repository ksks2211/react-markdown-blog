import { MdDelete } from "react-icons/md";
import { useDeleteCategory } from "../../../hooks/useCategory";
import { useEffect } from "react";

export default function DeleteCategoryBtn({
  categoryId,
  setErrorMessage,
}: {
  categoryId: string;
  setErrorMessage: (msg: string) => void;
}) {
  const mutation = useDeleteCategory();

  useEffect(() => {
    if (mutation.error !== null) {
      setErrorMessage(mutation.error.message || "Category Update Failed");
    }
  }, [mutation.error, setErrorMessage]);

  const handleRemoveCategory = async () => {
    await mutation.mutateAsync(categoryId);
  };

  return <MdDelete className="delete-icon" onClick={handleRemoveCategory} />;
}
