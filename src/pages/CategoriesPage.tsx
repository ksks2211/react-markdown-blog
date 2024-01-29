import { useChangeMenu } from "../hooks/useGlobal";
import { useGetCategories } from "../hooks/useCategory";
import CategoriesCard from "../components/containers/CategoriesCard";
import Menu from "../contexts/Menu.enum";
import ErrorFallback from "../errors/ErrorFallback";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import { styled } from "@mui/material";

const StyledCategoriesPage = styled("div")`
  padding: 3rem;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 3.5rem;
    padding-right: 7rem;
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
