import { useChangeMenu } from "../hooks/useGlobal";
import { useGetCategories } from "../hooks/useCategory";
import CategoriesCard from "../components/containers/CategoriesCard";
import Menu from "../contexts/Menu.enum";
import ErrorFallback from "../errors/ErrorFallback";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import { styled } from "@mui/material";
import { useErrorMessageSnackbarState } from "../hooks/useSnackbarState";
import SnackbarAlert from "../components/common/ErrorSnackbar";
import { EmptyResponseError } from "../errors/HttpErrors";

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
  const { snackbarState, closeSnackbar, displaySnackbar } =
    useErrorMessageSnackbarState();

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) {
    const error = new EmptyResponseError("Empty Response Error");
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  }

  return (
    <StyledCategoriesPage>
      <CategoriesCard rootCategory={data} setErrorMessage={displaySnackbar} />
      <SnackbarAlert snackbarState={snackbarState} onClose={closeSnackbar} />
    </StyledCategoriesPage>
  );
};

const CategoriesWithLayout = withLayout(CategoriesPage);

export default CategoriesWithLayout;
