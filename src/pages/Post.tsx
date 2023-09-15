import { useEffect } from "react";
import useGlobal from "../hooks/useGlobal";
import usePost from "../hooks/usePost";
import { useParams } from "react-router-dom";
import withLayout from "../hoc/withLayout";

const Post: React.FC = () => {
  const { changeMenu } = useGlobal();
  const { id } = useParams();

  useEffect(() => {
    changeMenu("POSTS");
  }, [changeMenu]);

  const { data, isLoading, error } = usePost(id || 0);

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined || id === undefined)
    return <div>Error : {error?.message}</div>;

  return (
    <div>
      Category : {data.category}
      Content : {data.content}
      Created At : {data.createdAt}
      Tags : {data.tags}
      Writer : {data.writer}
      Updated At : {data.updatedAt}
    </div>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
