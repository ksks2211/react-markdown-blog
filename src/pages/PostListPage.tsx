import { useState } from "react";
import { useChangeMenu } from "../hooks/useGlobal";
import { useGetPostList } from "../hooks/usePostQuery";
import toInteger from "lodash-es/toInteger";
import { formatDateFromNow } from "../helpers/dateUtils";
import PostCard from "../components/common/PostCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Menu from "../contexts/Menu.enum";
import Loader from "../components/common/Loader";
import withLayout from "../hoc/withLayout";
import { scrollToTheTop } from "../helpers/scrollUtils";
import { styled } from "@mui/material";
import { StyledPostPage, StyledPrevPageBtn } from "./PostPage/PostPage.styles";
import { IoMdAdd } from "react-icons/io";

const StyledPostList = styled("div")`
  margin-top: 1.5rem;
`;

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
    scrollToTheTop();
  };

  const handleAddPost = () => {
    navigate("/posts/create");
  };

  return (
    <StyledPostPage>
      <StyledPrevPageBtn>
        <IoMdAdd onClick={handleAddPost} />
      </StyledPrevPageBtn>
      <StyledPostList>
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
      </StyledPostList>

      <Stack justifyContent="center" alignItems="center" spacing={0}>
        <Pagination
          variant="outlined"
          color="primary"
          count={totalPages}
          page={page}
          onChange={handlePage}
        />
      </Stack>
    </StyledPostPage>
  );
};

const PostsWithLayout = withLayout(PostList);

export default PostsWithLayout;
