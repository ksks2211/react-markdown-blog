import useGlobal, { useChangeMenu } from "../hooks/useGlobal";
import { useGetPostListByCategory } from "../hooks/usePostQuery";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "../contexts/Menu.enum";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import {
  StyledPostPage,
  StyledUpperNavigation,
  StyledPostList,
} from "./PostPage/PostPage.styles";
import { IoMdAdd } from "react-icons/io";
import { useChangeTitle } from "../hooks/useHeaderTitle";

import { MdArrowBack } from "react-icons/md";
import { useEffect, useMemo } from "react";
import ErrorFallback from "../errors/ErrorFallback";
import { EmptyResponseError } from "../errors";

const PATH_REGEX = /^(\/\w+){1,8}$/;

const generatePathAndCategory = (pathname: string, username: string) => {
  const isValidPath = PATH_REGEX.test(pathname);

  const categoryId = `${username}-${pathname.split("/").splice(2).join("-")}`;

  const category = `/${categoryId.split("-").splice(1).join("/")}`;

  const createPath = `/posts/create?category=/${pathname
    .split("/")
    .splice(2)
    .join("/")}`;

  return {
    isValidPath,
    categoryId,
    category,
    createPath,
  };
};

const PostListByCategory: React.FC = () => {
  useChangeMenu(Menu.CATEGORIES);
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useGlobal();
  const { isValidPath, categoryId, category, createPath } = useMemo(
    () => generatePathAndCategory(location.pathname, username),
    [location.pathname, username]
  );
  useChangeTitle(category);

  useEffect(() => {
    if (!isValidPath) {
      navigate("/categories");
    }
  }, [isValidPath, navigate]);

  const { data, isLoading, error, hasNextPage, fetchNextPage, refetch } =
    useGetPostListByCategory({ categoryId });

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) {
    const error = new EmptyResponseError("Fail to get proper data from server");
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  }

  const { postList } = data.pages[0];
  const isEmpty = postList.length === 0;

  const handleLoadMorePosts = async () => {
    await fetchNextPage();
  };

  const handleAddPost = () => {
    navigate(createPath);
  };

  const handleBackToPrevPage = () => {
    navigate("/categories");
  };

  return (
    <StyledPostPage>
      {isEmpty && <Navigate to={createPath} />}
      <StyledUpperNavigation>
        <MdArrowBack onClick={handleBackToPrevPage} />
        <IoMdAdd onClick={handleAddPost} />
      </StyledUpperNavigation>
      <StyledPostList>
        {postList.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            postedBy={post.writerDisplayName}
            createdAtFromNow={formatDateFromNow(post.createdAt)}
          />
        ))}
      </StyledPostList>
      <Stack
        direction="row"
        alignItems="end"
        justifyContent="center"
        marginTop="auto"
        justifySelf="end"
      >
        <Button
          variant="contained"
          color="success"
          disabled={!hasNextPage}
          onClick={handleLoadMorePosts}
        >
          More
        </Button>
      </Stack>
    </StyledPostPage>
  );
};

const PostListByCategoryWithLayout = withLayout(PostListByCategory);
export default PostListByCategoryWithLayout;
