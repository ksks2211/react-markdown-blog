import { useCallback, useEffect } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import { useGetPostList } from "../hooks/usePostQuery";
import toInteger from "lodash-es/toInteger";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../contexts/Menu.enum";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import { scrollToTheTop } from "../helpers/scrollUtils";
import { styled, Stack, Pagination } from "@mui/material";
import { StyledPostPage, StyledPrevPageBtn } from "./PostPage/PostPage.styles";
import { IoMdAdd } from "react-icons/io";
import ErrorFallback from "../errors/ErrorFallback";

export const StyledPostList = styled("div")`
  margin-top: 1.5rem;
`;

// ?page=1
const PostList: React.FC = () => {
  useChangeMenu(Menu.POSTS);

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const page = toInteger(params.get("page") || "1");
  const { data, isLoading, error, refetch } = useGetPostList({ page });

  useEffect(() => {
    scrollToTheTop();
  }, [page]);

  const handleAddPost = useCallback(() => {
    navigate("/posts/create");
  }, [navigate]);

  const handlePage = useCallback(
    (e: React.ChangeEvent<unknown>, pageNum: number) => {
      e.preventDefault();
      setParams({ page: `${pageNum}` });
    },
    [setParams]
  );

  if (isLoading) return <Loader />;
  if (error || data === undefined)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

  const { postList, totalPages } = data;

  return (
    <StyledPostPage>
      <StyledPrevPageBtn>
        <IoMdAdd onClick={handleAddPost} />
      </StyledPrevPageBtn>
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

      <Stack justifyContent="center" alignItems="center" spacing={0}>
        <Pagination
          variant="outlined"
          color="primary"
          count={totalPages}
          page={page}
          onChange={handlePage}
        />
      </Stack>
    </StyledPostPage>
  );
};

const PostsWithLayout = withLayout(PostList);

export default PostsWithLayout;
