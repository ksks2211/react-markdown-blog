import DirectoryCard from "../components/DirectoryCard";
import withLayout from "../hoc/withLayout";

const Categories: React.FC = () => {
  return (
    <div>
      <DirectoryCard />
    </div>
  );
};

const CategoriesWithLayout = withLayout(Categories);

export default CategoriesWithLayout;
