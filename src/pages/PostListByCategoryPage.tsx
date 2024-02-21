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
import { useEffect } from "react";

const regex = /^(\/\w+){1,8}$/;

const PostListByCategory: React.FC = () => {
  useChangeMenu(Menu.CATEGORIES);

  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useGlobal();
  const isValidPath = regex.test(location.pathname);
  useEffect(() => {
    if (!isValidPath) {
      navigate("/categories");
    }
  }, [isValidPath, navigate]);

  const categoryId = `${username}-${location.pathname
    .split("/")
    .splice(2)
    .join("-")}`;

  const category = `/${categoryId.split("-").splice(1).join("/")}`;
  useChangeTitle(`${category}`);

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useGetPostListByCategory({ categoryId });

  const createPath = `/posts/create?category=/${location.pathname
    .split("/")
    .splice(2)
    .join("/")}`;

  const handleLoadMorePosts = async () => {
    await fetchNextPage();
  };

  if (isLoading) return <Loader />;
  if (error) throw error;
  if (data === undefined) {
    throw new Error(`Failed To Get Posts with Category ${categoryId}`);
  }

  const { postList } = data.pages[0];
  const isEmpty = postList.length === 0;

  const handleAddPost = () => {
    navigate(createPath);
  };

  const handleBackToPrevPage = () => {
    navigate("/categories");
  };

  return (
    <StyledPostPage>
      {isEmpty && <Navigate to={`${createPath}&`} />}
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
            postedBy={post.writer}
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
