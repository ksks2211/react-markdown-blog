import { useEffect } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import useCategories from "../hooks/useCategories";
import CategoriesCard from "../components/common/CategoriesCard";
import { Menu } from "../contexts/menuEnum";

const CategoriesPage: React.FC = () => {
  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu(Menu.CATEGORIES);
  }, [changeMenu]);

  const { data, isLoading, error } = useCategories();

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
