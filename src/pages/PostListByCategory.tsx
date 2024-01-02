import { useChangeMenu } from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";
import { useGetPostListByCategory } from "../hooks/usePost";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/PostCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "../contexts/Menu";
import { usePathParamId } from "../hooks/useParameter";

const PostListByCategory: React.FC = () => {
  const id = usePathParamId();
  useChangeMenu(Menu.CATEGORIES);

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useGetPostListByCategory({ categoryId: id });

  const loadMorePosts = async () => {
    await fetchNextPage();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined) {
    if (error) throw error;
    else throw new Error(`Failed To Get Posts with Category ${id}`);
  }

  const { postList } = data.pages[0];

  return (
    <div>
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

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Button
          variant="contained"
          color="success"
          disabled={!hasNextPage}
          onClick={loadMorePosts}
        >
          More
        </Button>
      </Stack>
    </div>
  );
};

const PostListByCategoryWithLayout = withLayout(PostListByCategory);
export default PostListByCategoryWithLayout;