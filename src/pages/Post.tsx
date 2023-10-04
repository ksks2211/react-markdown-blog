import { useEffect, useRef, useState } from "react";
import useGlobal from "../hooks/useGlobal";
import usePost from "../hooks/usePost";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import withLayout from "../hoc/withLayout";
import { formatDate } from "../helpers/dateUtils";
import MarkdownRenderer from "../components/common/MarkdownRenderer";
import styles from "./Post.module.scss";
import cn from "classnames/bind";
import { MdArrowBack } from "react-icons/md";
import UtterancesComments from "../components/common/UtterancesComments";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePrevAndNextPosts from "../hooks/usePrevAndNextPosts";
import throttle from "lodash-es/throttle";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const cx = cn.bind(styles);

const Post: React.FC = () => {
  const { changeMenu } = useGlobal();
  const { id } = useParams();

  if (id === undefined) {
    throw new Error(`Incorrect Post Id`);
  }

  const ref = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    changeMenu("POSTS");

    const checkLoadMore = () => {
      if (ref.current === null) return;
      if (window.scrollY > ref.current.offsetHeight * 0.5) {
        setLoadMore(true);
        window.removeEventListener("scroll", checkLoadMore);
      }
    };

    if (document.documentElement.scrollHeight <= window.innerHeight) {
      setTimeout(() => {
        setLoadMore(true);
        window.removeEventListener("scroll", checkLoadMore);
      }, 1000);
    }

    window.addEventListener("scroll", throttle(checkLoadMore, 300));
    return () => window.removeEventListener("scroll", checkLoadMore);
  }, [changeMenu]);

  const goBack = () => {
    // If you have the state and it has fromPage
    if (location.state && location.state.fromPage) {
      navigate(`/posts${location.state.fromPage}`);
    } else {
      // Else, navigate to default
      navigate("/posts?page=1");
    }
  };

  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = usePost(id || 0);

  const {
    data: prevAndNextPosts,
    error: morePostsError,
    isLoading: isLoadingMorePosts,
  } = usePrevAndNextPosts(id, loadMore);

  // Loading ...
  if (isLoadingPost) return <div>Loading...</div>;

  // Error
  if (postError instanceof Error) throw postError;
  if (post === undefined) throw new Error(`Failed To Get Post ${id}`);
  // if (morePostsError instanceof Error) throw morePostsError;

  const createdAt = formatDate(post.createdAt);
  const updatedAt = formatDate(post.updatedAt);

  if (loadMore && morePostsError instanceof Error) throw morePostsError;

  return (
    <div className={cx("Post")}>
      <div className={cx("main")} ref={ref}>
        <div className={cx("back-btn")}>
          <MdArrowBack className={cx("back-icon")} onClick={goBack} />
        </div>

        <div className={cx("post-metadata")}>
          <h1 className={cx("title")}>{post.title}</h1>

          <div className={cx("meta", "time")}>
            <time>
              <label>Posted</label>
              {createdAt}
            </time>
            <time>
              <label>Last Update</label>
              {updatedAt}
            </time>
          </div>

          <div className={cx("meta", "writer")}>
            <span>
              <label>Writer</label>
              {post.writer}
            </span>
            <span>
              <label>Category</label>
              {post.category.split("/").slice(1).join("/")}
            </span>
          </div>
        </div>

        <div>
          <MarkdownRenderer content={post.content} />
        </div>

        <Box mt={10}>
          <Stack
            flexWrap="wrap"
            direction="row"
            spacing={1}
            justifyContent="end"
          >
            {post.tags.map((tag) => (
              <Chip label={tag} variant="outlined" key={tag} color="primary" />
            ))}
          </Stack>
        </Box>
      </div>

      {!loadMore || isLoadingMorePosts ? (
        <Skeleton style={{ width: "100%", height: "6rem" }} count={1} />
      ) : morePostsError === null && prevAndNextPosts !== undefined ? (
        <div className={cx("btn-group")}>
          <Link
            to={`/posts/${prevAndNextPosts.prev?.id}`}
            className={cx("btn-prev", "btn", {
              disabled: !prevAndNextPosts.hasPrev,
            })}
          >
            <span>
              {prevAndNextPosts.hasPrev ? prevAndNextPosts.prev.title : "None"}
            </span>
          </Link>
          <Link
            to={`/posts/${prevAndNextPosts.next?.id}`}
            className={cx("btn-next", "btn", {
              disabled: !prevAndNextPosts.hasNext,
            })}
          >
            <span>
              {prevAndNextPosts.hasNext ? prevAndNextPosts.next.title : "None"}
            </span>
          </Link>
        </div>
      ) : (
        ""
      )}
      <UtterancesComments />
    </div>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
