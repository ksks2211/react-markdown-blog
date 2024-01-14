import { useChangeMenu } from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";
import { useGetPostListByCategory } from "../hooks/usePostQuery";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/PostCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "../contexts/Menu.enum";
import { usePathParamId } from "../hooks/useParameter";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const PostListByCategory: React.FC = () => {
  const id = usePathParamId();
  useChangeMenu(Menu.CATEGORIES);

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useGetPostListByCategory({ categoryId: id });

  const addr = `/posts/create?category=${id}`;

  const handleLoadMorePosts = async () => {
    await fetchNextPage();
  };

  if (isLoading) return <Loader />;
  if (error) throw error;
  if (data === undefined) {
    throw new Error(`Failed To Get Posts with Category ${id}`);
  }

  const { postList } = data.pages[0];

  return (
    <div>
      <div>
        <Link to={addr}>Create Post</Link>
      </div>
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
          onClick={handleLoadMorePosts}
        >
          More
        </Button>
      </Stack>
    </div>
  );
};

const PostListByCategoryWithLayout = withLayout(PostListByCategory);
export default PostListByCategoryWithLayout;
