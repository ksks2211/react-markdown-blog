import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobal from "../hooks/useGlobal";
import withLayout from "../hoc/withLayout";
import usePostsByCategory from "../hooks/usePostsByCategory";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Menu } from "../contexts/menuEnum";

const PostListByCategory: React.FC = () => {
  const { changeMenu } = useGlobal();

  useEffect(() => {
    changeMenu(Menu.CATEGORIES);
  }, [changeMenu]);

  const { id } = useParams();

  if (id === undefined) {
    throw new Error(`Incorrect Category Id`);
  }

  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    usePostsByCategory(id);

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
