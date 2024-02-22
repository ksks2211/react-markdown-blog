import { useChangeMenu } from "../../hooks/useGlobal";
import Menu from "../../contexts/Menu.enum";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCategoryList } from "../../hooks/useCategory";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../errors/ErrorFallback";
import { useCallback, useMemo } from "react";
import includes from "lodash-es/includes";
import PostCreatePage from "./PostCreatePage";

const DEFAULT_CATEGORY_PARAM = "/no_category";

export default function PostCreateFetcher() {
  useChangeMenu(Menu.POSTS);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || DEFAULT_CATEGORY_PARAM;

  const {
    data,
    isLoading: isLoadingCategory,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryList();

  const categoryList = useMemo(() => {
    const tmp = data?.categories || [];
    if (!includes(tmp, categoryParam)) {
      tmp.push(categoryParam);
    }
    return tmp;
  }, [categoryParam, data?.categories]);
  const navigate = useNavigate();

  const handlePrevPageBtn = useCallback(() => {
    if (categoryParam === DEFAULT_CATEGORY_PARAM) navigate("/posts");
    else if (searchParams.get("empty")) navigate(`/categories`);
    else navigate(`/categories${categoryParam}`);
  }, [categoryParam, navigate, searchParams]);

  if (isLoadingCategory) return <Loader />;

  if (categoryError instanceof Error)
    <ErrorFallback
      error={categoryError}
      resetErrorBoundary={refetchCategory}
    />;

  return (
    <PostCreatePage
      category={categoryParam}
      categoryList={categoryList}
      handlePrevPageBtn={handlePrevPageBtn}
    />
  );
}
