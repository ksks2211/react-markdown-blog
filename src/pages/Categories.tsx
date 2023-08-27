import withLayout from "../hoc/withLayout";

const Categories: React.FC = () => {
  return <p>This is Categories</p>;
};

const CategoriesWithLayout = withLayout(Categories);

export default CategoriesWithLayout;
