import { useEffect } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import usePosts from "../hooks/usePosts";
import useSearchParams from "../hooks/useSearchParams";
import toInteger from "lodash-es/toInteger";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";

// ?page=1
const PostList: React.FC = () => {
  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu("POSTS");
  }, [changeMenu]);

  const params = useSearchParams();
  const page = params.get("page") || "1";

  const { data, isLoading, error } = usePosts(toInteger(page));

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined) {
    if (error) throw error;
    else throw new Error(`Failed To Get Posts Page ${page}`);
  }

  const { postList } = data;

  return (
    <div>
      {/* Total Pages : {totalPages} */}
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
      </div>
    </div>
  );
};

const PostsWithLayout = withLayout(PostList);

export default PostsWithLayout;
