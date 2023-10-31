import { useEffect, useState } from "react";
import withLayout from "../hoc/withLayout";
import useGlobal from "../hooks/useGlobal";
import usePosts from "../hooks/usePosts";
import useSearchParams from "../hooks/useSearchParams";
import toInteger from "lodash-es/toInteger";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

// ?page=1
const PostList: React.FC = () => {
  const navigate = useNavigate();

  const { changeMenu } = useGlobal();
  useEffect(() => {
    changeMenu("POSTS");
  }, [changeMenu]);

  const params = useSearchParams();
  const [page, setPage] = useState(toInteger(params.get("page") || "1"));
  const { data, isLoading, error } = usePosts(page);

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined) {
    if (error) throw error;
    else throw new Error(`Failed To Get Posts Page ${page}`);
  }

  const { postList, totalPages } = data;

  const handlePage = (e: React.ChangeEvent<unknown>, pageNum: number) => {
    e.preventDefault();
    navigate(`/posts?page=${pageNum}`);
    setPage(pageNum);
  };

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

      {/* <Paginator currentPage={page} lastPage={totalPages} /> */}

      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <Pagination
          variant="outlined"
          color="primary"
          count={totalPages}
          page={page}
          onChange={handlePage}
        />
      </Stack>
    </div>
  );
};

const PostsWithLayout = withLayout(PostList);

export default PostsWithLayout;
