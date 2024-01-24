import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import cn from "classnames/bind";
import throttle from "lodash-es/throttle";

import "react-loading-skeleton/dist/skeleton.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Skeleton from "react-loading-skeleton";

import { useChangeMenu, useUsername } from "../hooks/useGlobal";
import { useDeletePost } from "../hooks/usePostMutation";
import { usePrevAndNextPosts, useGetPost } from "../hooks/usePostQuery";

import { usePathParamId } from "../hooks/useParameter";
import { formatDate } from "../helpers/dateUtils";
import MarkdownRenderer from "../components/common/MarkdownRenderer/MarkdownRenderer";
import styles from "./PostPage.module.scss";
import { MdArrowBack, MdDelete } from "react-icons/md";
import UtterancesComments from "../components/common/UtterancesComments";

import Menu from "../contexts/Menu.enum";
import Loader from "../components/common/Loader";
import ErrorFallback from "../errors/ErrorFallback";
import withLayout from "../hoc/withLayout";
import { scrollToTheTop } from "../helpers/scrollUtils";
import { styled, useTheme } from "@mui/material";
import { rgba, darken } from "polished";

const cx = cn.bind(styles);

const StyledPostPage = styled("div")`
  margin: 2rem 2rem 0;

  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 4rem 5rem 0;
  }
`;

const StyledPrevPageBtn = styled("div")`
  height: 2rem;
  display: flex;
  align-items: center;

  svg {
    border-radius: 0.2rem;
    color: #fff;
    font-size: 1.6rem;
    background-color: ${(props) => props.theme.global.mainColor};
    cursor: pointer;
    transition: 0.2s ease-out;
    transform: scale(1.3);

    &:hover {
      background-color: ${(props) =>
        darken(0.05, props.theme.global.mainColor)};
    }
  }
`;

const StyledPrevAndNextPostBtn = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;

  a {
    display: flex;
    flex-flow: column;
    width: 50%;
    border: 1px solid ${(props) => props.theme.global.btnColor};
    height: 6rem;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 0.4s ease-out;

    &:hover {
      background-color: ${(props) => props.theme.global.btnColor};
      color: #fff;

      span {
        color: #fff !important;
      }
    }
  }
`;

const Post: React.FC = () => {
  const id = usePathParamId();
  const username = useUsername();
  const mutation = useDeletePost();
  useChangeMenu(Menu.POSTS);

  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loadMore, setLoadMore] = useState(false);
  const theme = useTheme();

  const backgroundColor = rgba(theme.palette.info.light, 0.03);

  const postId = parseInt(id);

  useEffect(() => {
    scrollToTheTop();

    const checkLoadMore = () => {
      if (ref.current === null) return;
      if (window.scrollY > document.documentElement.scrollHeight * 0.3) {
        setLoadMore(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const handleScroll = throttle(checkLoadMore, 300);

    if (document.documentElement.scrollHeight <= window.innerHeight + 250) {
      setTimeout(() => {
        setLoadMore(true);
        window.removeEventListener("scroll", handleScroll);
      }, 1000);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setLoadMore(false);
    };
  }, [postId]);

  const handleBackToPrevPage = () => {
    // If you have the state and it has fromPage
    if (location.state && location.state.fromPage) {
      navigate(`/posts${location.state.fromPage}`);
    } else {
      // Else, navigate to default
      navigate("/posts?page=1");
    }
  };

  const handlePostDelete = async () => {
    const isConfirmed = window.confirm("Delete Post?");
    if (isConfirmed) {
      await mutation.mutateAsync(postId);
      window.alert("Deleted!");
      handleBackToPrevPage();
    }
  };

  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
    refetch: refetchPost,
  } = useGetPost({ postId: id || 0 });

  const {
    data: prevAndNextPosts,
    error: morePostsError,
    isLoading: isLoadingMorePosts,
    refetch: refetchPrevAndNext,
  } = usePrevAndNextPosts({ postId: id, enabled: loadMore });

  // Loading ...
  if (isLoadingPost) return <Loader />;

  // Error
  if (postError instanceof Error)
    <ErrorFallback error={postError} resetErrorBoundary={refetchPost} />;

  if (post === undefined)
    return (
      <ErrorFallback
        error={new Error(`Failed To Get Post ${id}`)}
        resetErrorBoundary={refetchPost}
      />
    );

  // if (morePostsError instanceof Error) throw morePostsError;

  if (loadMore && morePostsError instanceof Error)
    return (
      <ErrorFallback
        error={morePostsError}
        resetErrorBoundary={refetchPrevAndNext}
      />
    );

  const createdAt = formatDate(post.createdAt);
  const updatedAt = formatDate(post.updatedAt);
  const isMyPost = username === post.writer;

  return (
    <StyledPostPage className={cx("Post")}>
      <StyledPrevPageBtn className={cx("back-btn")}>
        <MdArrowBack
          className={cx("back-icon")}
          onClick={handleBackToPrevPage}
        />
      </StyledPrevPageBtn>

      <div className={cx("main")} ref={ref}>
        <div className={cx("post-metadata")}>
          <h1 className={cx("title")}>
            {post.title}
            {isMyPost && (
              <div className={cx("delete-btn")} onClick={handlePostDelete}>
                <MdDelete />
              </div>
            )}
          </h1>

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
              <Chip
                label={tag}
                variant="outlined"
                key={tag}
                color="info"
                sx={{
                  fontWeight: "500",
                  backgroundColor: backgroundColor,
                }}
              />
            ))}
          </Stack>
        </Box>
      </div>

      {!loadMore || isLoadingMorePosts ? (
        <Skeleton style={{ width: "100%", height: "6rem" }} count={1} />
      ) : morePostsError === null && prevAndNextPosts !== undefined ? (
        <StyledPrevAndNextPostBtn className={cx("btn-group")}>
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
        </StyledPrevAndNextPostBtn>
      ) : (
        ""
      )}
      <UtterancesComments postId={postId} />
    </StyledPostPage>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
