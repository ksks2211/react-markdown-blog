import { lazy, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useChangeMenu, useUsername } from "../../hooks/useGlobal";
import { useDeletePost } from "../../hooks/usePostMutation";
import { usePrevAndNextPosts, useGetPost } from "../../hooks/usePostQuery";
import { usePathParamId } from "../../hooks/useParameter";
import { formatDate } from "../../helpers/dateUtils";
import { MdArrowBack, MdDelete } from "react-icons/md";
import Menu from "../../contexts/Menu.enum";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../errors/ErrorFallback";
import withLayout from "../../hoc/withLayout";
import { scrollToTheTop } from "../../helpers/scrollUtils";
import {
  StyledPostPage,
  StyledPrevPageBtn,
  StyledMainPost,
  StyledPostMeta,
  StyledTitle,
  StyledTimeMetadata,
  StyledPostDetails,
} from "./PostPage.styles";
import UtterancesComments from "../../components/common/UtterancesComments";
import PrevAndNextPostBtn from "./PrevAndNextPostBtn";
import SuspenseLoader from "../../components/common/SuspenseLoader";
import TagsBox from "./TagsBox";
import { throttle } from "lodash-es";
const MarkdownRenderer = lazy(
  () => import("../../components/common/MarkdownRenderer")
);

const Post: React.FC = () => {
  useChangeMenu(Menu.POSTS);
  useEffect(() => {
    import("react-loading-skeleton/dist/skeleton.css");
  }, []);

  const postId = parseInt(usePathParamId());

  const username = useUsername();
  const mutation = useDeletePost();
  const mainRef = useRef<HTMLDivElement>(null);
  const markdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navigate = useNavigate();
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    scrollToTheTop();

    setTimeout(() => {
      setLoadMore(true);
    }, 4000);

    const checkLoadMore = throttle(() => {
      if (
        mainRef.current !== null &&
        mainRef.current.scrollHeight +
          mainRef.current.getBoundingClientRect().y <=
          window.innerHeight + window.scrollY
      ) {
        setLoadMore(true);
      }
    }, 400);

    window.addEventListener("scroll", checkLoadMore);
    return () => {
      window.removeEventListener("scroll", checkLoadMore);
    };
  }, [postId]);

  useEffect(() => {
    if (markdownRef.current) {
      console.log(markdownRef.current.innerText);

      const headingElements =
        markdownRef.current.querySelectorAll("h1, h2, h3");
      console.log(headingElements);
    }
  }, []);

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
  } = useGetPost({ postId: postId });

  const {
    data: prevAndNextPosts,
    error: morePostsError,
    isLoading: isLoadingMorePosts,
    refetch: refetchPrevAndNext,
  } = usePrevAndNextPosts({ postId: postId, enabled: loadMore });

  // Loading ...
  if (isLoadingPost) return <Loader />;

  // Error
  if (postError instanceof Error)
    <ErrorFallback error={postError} resetErrorBoundary={refetchPost} />;

  if (post === undefined)
    return (
      <ErrorFallback
        error={new Error(`Failed To Get Post ${postId}`)}
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
    <StyledPostPage>
      <StyledPrevPageBtn>
        <MdArrowBack onClick={handleBackToPrevPage} />
      </StyledPrevPageBtn>

      <StyledMainPost ref={mainRef}>
        <StyledPostMeta>
          <StyledTitle>
            {post.title}
            {isMyPost && (
              <div onClick={handlePostDelete} className="delete-btn">
                <MdDelete />
              </div>
            )}
          </StyledTitle>

          <StyledTimeMetadata>
            <time>
              <label>Posted</label>
              {createdAt}
            </time>
            <time>
              <label>Last Update</label>
              {updatedAt}
            </time>
          </StyledTimeMetadata>

          <StyledPostDetails>
            <span>
              <label>Writer</label>
              {post.writer}
            </span>
            <span>
              <label>Category</label>
              {post.category.split("/").slice(1).join("/")}
            </span>
          </StyledPostDetails>
        </StyledPostMeta>

        <div ref={markdownRef}>
          <SuspenseLoader>
            <MarkdownRenderer content={post.content} />
          </SuspenseLoader>
        </div>

        <TagsBox tags={post.tags} />
      </StyledMainPost>

      {!loadMore || isLoadingMorePosts ? (
        <Skeleton style={{ width: "100%", height: "6rem" }} count={1} />
      ) : morePostsError === null && prevAndNextPosts !== undefined ? (
        <PrevAndNextPostBtn prevAndNextPosts={prevAndNextPosts} />
      ) : (
        ""
      )}
      <UtterancesComments postId={postId} />
    </StyledPostPage>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
