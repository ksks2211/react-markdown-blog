import { MdDelete } from "react-icons/md";
import { useDeleteCategory } from "../../../hooks/useCategory";

export default function DeleteCategoryBtn({
  categoryId,
}: {
  categoryId: string;
}) {
  const mutation = useDeleteCategory();

  const handleRemoveCategory = async () => {
    await mutation.mutateAsync(categoryId);
  };

  return <MdDelete className="delete-icon" onClick={handleRemoveCategory} />;
}
