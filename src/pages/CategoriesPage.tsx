import { useChangeMenu } from "../hooks/useGlobal";
import { useGetCategories } from "../hooks/useCategory";
import CategoriesCard from "../components/containers/CategoriesCard";
import Menu from "../contexts/Menu.enum";
import ErrorFallback from "../errors/ErrorFallback";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";

const CategoriesPage: React.FC = () => {
  useChangeMenu(Menu.CATEGORIES);

  const { data, isLoading, error, refetch } = useGetCategories();

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) throw new Error(`Failed To Get Categories`);

  return (
    <div>
      <CategoriesCard rootCategory={data} />
    </div>
  );
};

const CategoriesWithLayout = withLayout(CategoriesPage);

export default CategoriesWithLayout;
