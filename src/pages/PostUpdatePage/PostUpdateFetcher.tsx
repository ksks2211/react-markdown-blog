import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import Menu from "../../contexts/Menu.enum";
import ErrorFallback from "../../errors/ErrorFallback";
import { useChangeMenu, useUsername } from "../../hooks/useGlobal";
import { usePathParamId } from "../../hooks/useParameter";
import { useGetPost } from "../../hooks/usePostQuery";
import { useNavigate } from "react-router-dom";
import { NotFoundError } from "../../errors";
import { useGetCategoryList } from "../../hooks/useCategory";
import PostUpdatePage from "./PostUpdatePage";

export default function PostUpdateFetcher() {
  useChangeMenu(Menu.POSTS);
  const postId = parseInt(usePathParamId());
  const username = useUsername();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
    refetch: refetchPost,
  } = useGetPost({ postId: postId });

  const {
    data: categoryList,
    isLoading: isLoadingCategory,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryList();

  // redirect when non-writer try to edit post
  useEffect(() => {
    if (post !== undefined && post.writer !== username) {
      alert("Not Allowed");
      navigate("/posts");
    }
  }, [post, username, navigate]);

  // redirect when try to edit non-exist post
  useEffect(() => {
    if (postError !== null && postError instanceof NotFoundError) {
      alert("No Such Post");
      navigate("/posts");
    }
  }, [navigate, postError]);

  if (isLoadingPost || isLoadingCategory) return <Loader />;

  if (postError instanceof Error)
    <ErrorFallback error={postError} resetErrorBoundary={refetchPost} />;

  if (categoryError instanceof Error)
    <ErrorFallback
      error={categoryError}
      resetErrorBoundary={refetchCategory}
    />;

  // empty body
  if (post === undefined)
    return (
      <ErrorFallback
        error={new Error(`Failed To Get Post ${postId}`)}
        resetErrorBoundary={refetchPost}
      />
    );

  if (categoryList === undefined)
    return (
      <ErrorFallback
        error={new Error(`Failed To Get Category List`)}
        resetErrorBoundary={refetchPost}
      />
    );

  return (
    <PostUpdatePage
      categoryList={categoryList.categories}
      post={post}
      postId={postId}
    />
  );
}
