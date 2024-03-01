import type { PostSearchParams } from "@customTypes/post.types";
import PostCard from "../../components/common/PostCard";
import { formatDateFromNow } from "../../helpers/dateUtils";
import { StyledPostList, StyledPostPage } from "../PostPage/PostPage.styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SnackbarAlert from "../../components/common/ErrorSnackbar";
import { useErrorMessageSnackbarState } from "../../hooks/useSnackbarState";
import { useGetPostListBySearchQuery } from "../../hooks/usePostQuery";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../errors/ErrorFallback";
import { EmptyResponseError } from "../../errors/HttpErrors";
import { memo } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/material";
import { darken } from "polished";

interface PostsSearchListProps {
  params: PostSearchParams;
}

const StyledNoResult = styled("div")`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${(props) => darken(0.05, props.theme.palette.warning.dark)};
`;

const PostsSearch: React.FC<PostsSearchListProps> = ({ params }) => {
  const { snackbarState, closeSnackbar } = useErrorMessageSnackbarState();

  const { data, isLoading, error, hasNextPage, fetchNextPage, refetch } =
    useGetPostListBySearchQuery({
      postSearchParams: params,
    });

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  if (data === undefined) {
    const error = new EmptyResponseError("Fail to get proper data from server");
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  }

  const handleLoadMorePosts = async () => {
    await fetchNextPage();
  };

  const { postList } = data.pages[0];
  const isEmpty = postList.length === 0;

  return (
    <>
      {isEmpty && (
        <Container>
          <StyledNoResult>No Result!</StyledNoResult>
        </Container>
      )}
      <StyledPostPage>
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
      </StyledPostPage>

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
          type="button"
          disabled={!hasNextPage}
          onClick={handleLoadMorePosts}
        >
          More
        </Button>

        <SnackbarAlert snackbarState={snackbarState} onClose={closeSnackbar} />
      </Stack>
    </>
  );
};

const PostsSearchList = memo(PostsSearch, (prev, next) => {
  if (prev.params.writer !== next.params.writer) return false;
  if (prev.params.tags.length !== next.params.tags.length) return false;
  if (prev.params.allTags !== next.params.allTags) return false;
  for (let i = 0; i < prev.params.tags.length; i++) {
    if (prev.params.tags[i] !== next.params.tags[i]) return false;
  }

  return true;
});

export default PostsSearchList;
