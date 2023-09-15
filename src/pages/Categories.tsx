import { useEffect } from "react";
import DirectoryCard from "../components/common/DirectoryCard";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";

const Categories: React.FC = () => {
  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu("CATEGORIES");
  }, [changeMenu]);

  return (
    <div>
      <DirectoryCard />
    </div>
  );
};

const CategoriesWithLayout = withLayout(Categories);

export default CategoriesWithLayout;
