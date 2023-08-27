import withLayout from "../hoc/withLayout";

const Posts: React.FC = () => {
  return <p>This is Posts</p>;
};

const PostsWithLayout = withLayout(Posts);

export default PostsWithLayout;
