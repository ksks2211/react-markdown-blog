import withLayout from "../hoc/withLayout";
import { useChangeMenu } from "../hooks/useGlobal";
import { useGetCategories } from "../hooks/useCategory";
import CategoriesCard from "../containers/CategoriesCard";
import Menu from "../contexts/Menu";

const CategoriesPage: React.FC = () => {
  useChangeMenu(Menu.CATEGORIES);

  const { data, isLoading, error } = useGetCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) throw error;
  if (data === undefined) throw new Error(`Failed To Get Categories`);

  return (
    <div>
      <CategoriesCard rootCategory={data} />
    </div>
  );
};

const CategoriesWithLayout = withLayout(CategoriesPage);

export default CategoriesWithLayout;
