import { useChangeMenu } from "../hooks/useGlobal";
import { useGetCategories } from "../hooks/useCategory";
import CategoriesCard from "../components/containers/CategoriesCard";
import Menu from "../contexts/Menu.enum";
import ErrorFallback from "../errors/ErrorFallback";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import { styled } from "@mui/material";

const StyledCategoriesPage = styled("div")`
  width: 100%;
  padding: 3rem 0.5rem;
  min-height: 80vh;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 3.5rem 4rem;
  }
`;

const CategoriesPage: React.FC = () => {
  useChangeMenu(Menu.CATEGORIES);

  const { data, isLoading, error, refetch } = useGetCategories();

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) throw new Error(`Failed To Get Categories`);

  return (
    <StyledCategoriesPage>
      <CategoriesCard rootCategory={data} />
    </StyledCategoriesPage>
  );
};

const CategoriesWithLayout = withLayout(CategoriesPage);

export default CategoriesWithLayout;
