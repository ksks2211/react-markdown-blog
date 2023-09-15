import { useEffect } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import usePosts from "../hooks/usePosts";
import useSearchParams from "../hooks/useSearchParams";
import { toInteger } from "lodash";
import { Link } from "react-router-dom";

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
  if (error || data === undefined) return <div>Error : {error?.message}</div>;

  const { totalPages, postList } = data;

  return (
    <div>
      Total Pages : {totalPages}
      <div>
        {postList.map((post) => (
          <div key={post.id}>
            Title : {post.title}
            Created At : {post.createdAt}
            Updated At : {post.updatedAt}
            Writer : {post.writer}
            Id : {post.id}
            Link : <Link to={`/posts/${post.id}`}>Link</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const PostsWithLayout = withLayout(PostList);

export default PostsWithLayout;
