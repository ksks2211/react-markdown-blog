import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useChangeMenu, useUsername } from "../../hooks/useGlobal";
import { useDeletePost } from "../../hooks/usePostMutation";
import { usePrevAndNextPosts, useGetPost } from "../../hooks/usePostQuery";
import { usePathParamId } from "../../hooks/useParameter";
import { formatDate } from "../../helpers/dateUtils";
import { MdArrowBack, MdDelete, MdEdit } from "react-icons/md";

import Menu from "../../contexts/Menu.enum";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../errors/ErrorFallback";
import withLayout from "../../hoc/withLayout";
import { scrollToTheTop } from "../../helpers/scrollUtils";
import {
  StyledPostPage,
  StyledUpperNavigation,
  StyledMainPost,
  StyledPostMeta,
  StyledTitle,
  StyledTimeMetadata,
  StyledPostDetails,
} from "./PostPage.styles";
import UtterancesComments from "../../components/common/UtterancesComments";
import PrevAndNextPostBtn from "./PrevAndNextPostBtn";
import TagsBox from "./TagsBox";
import { throttle } from "lodash-es";
import CenterSkeleton from "../../components/common/CenterSkeleton";

const MarkdownRenderer = lazy(
  () => import("../../components/common/MarkdownRenderer")
);

const Post: React.FC = () => {
  useChangeMenu(Menu.POSTS);

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
      const headingElements =
        markdownRef.current.querySelectorAll("h1, h2, h3");

      console.log(headingElements);
    }
  }, [postId]);

  const handleBackToPrevPage = useCallback(() => {
    // If you have the state and it has fromPage
    if (location.state && location.state.fromPage) {
      navigate(`/posts${location.state.fromPage}`);
    } else {
      // Else, navigate to default
      navigate("/posts?page=1");
    }
  }, [location.state, navigate]);

  const handlePostDelete = async () => {
    const isConfirmed = window.confirm("Delete Post?");
    if (isConfirmed) {
      await mutation.mutateAsync(postId);
      window.alert("Deleted!");
      handleBackToPrevPage();
    }
  };

  const handlePostEdit = () => {
    navigate(`/posts/update/${postId}`);
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
      <StyledUpperNavigation>
        <MdArrowBack onClick={handleBackToPrevPage} />
      </StyledUpperNavigation>

      <StyledMainPost ref={mainRef}>
        <StyledPostMeta>
          <StyledTitle>
            {post.title}

            {isMyPost && (
              <div className="post-owner-btn-wrapper">
                <div
                  onClick={handlePostDelete}
                  className="post-owner-btn delete-btn"
                >
                  <MdDelete />
                </div>
                <div
                  onClick={handlePostEdit}
                  className="post-owner-btn edit-btn"
                >
                  <MdEdit />
                </div>
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
              {post.writerDisplayName}
            </span>
            <span>
              <label>Category</label>
              {post.postCategory}
            </span>
          </StyledPostDetails>
        </StyledPostMeta>

        <div ref={markdownRef}>
          <Suspense fallback={<CenterSkeleton height={"35rem"} />}>
            <MarkdownRenderer content={post.content} />
          </Suspense>
        </div>

        <TagsBox tags={post.tags} />
      </StyledMainPost>

      {!loadMore || isLoadingMorePosts ? (
        <CenterSkeleton height={"8rem"} />
      ) : (
        morePostsError === null &&
        prevAndNextPosts !== undefined && (
          <PrevAndNextPostBtn prevAndNextPosts={prevAndNextPosts} />
        )
      )}
      <UtterancesComments postId={postId} />
    </StyledPostPage>
  );
};

const PostWithLayout = withLayout(Post);

export default PostWithLayout;
