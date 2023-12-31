import { useState } from "react";
import withLayout from "../hoc/withLayout";
import { useChangeMenu } from "../hooks/useGlobal";
import { useGetPostList } from "../hooks/usePostQuery";
import toInteger from "lodash-es/toInteger";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Menu from "../contexts/Menu.enum";
import Loader from "../components/Loader";

// ?page=1
const PostList: React.FC = () => {
  const navigate = useNavigate();
  useChangeMenu(Menu.POSTS);

  const [params] = useSearchParams();
  const [page, setPage] = useState(toInteger(params.get("page") || "1"));
  const { data, isLoading, error } = useGetPostList({ page });

  if (isLoading) return <Loader />;
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
