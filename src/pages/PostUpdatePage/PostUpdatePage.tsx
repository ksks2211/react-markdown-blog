import type { Post, PostCreateForm } from "@customTypes/post.types";
import { useCallback, useState } from "react";
import { useUpdatePost } from "../../hooks/usePostMutation";
import { useSnackbarState } from "../../hooks/useSnackbarState";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import isEmpty from "lodash-es/isEmpty";
import SnackbarAlert from "../../components/common/ErrorSnackbar";
import PostEditor from "../../components/common/PostEditor";

interface PostUpdateContainerProps {
  post: Post;
  postId: number;
  categoryList: string[];
}

export default function PostUpdatePage({
  post,
  postId,
  categoryList,
}: PostUpdateContainerProps) {
  const [state, setState] = useState<PostCreateForm>({
    title: post.title,
    content: post.content,
    tags: post.tags,
    category: post.postCategory,
  });
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();
  const { snackbarState, displaySnackbar, closeSnackbar } = useSnackbarState();
  const mutation = useUpdatePost();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setState((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  }, []);

  const handleAddTag = useCallback(() => {
    if (isEmpty(tagInput)) return;

    setState((prev) => {
      if (prev.tags.includes(tagInput.trim())) {
        return prev;
      }
      return {
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      };
    });

    setTagInput("");
  }, [tagInput]);

  const handleContent = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      content: value,
    }));
  }, []);

  const handlePrevPageBtn = useCallback(() => {
    navigate(`/posts/${postId}`);
  }, [postId, navigate]);

  const handleTagInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
    },
    []
  );

  const handleTagDelete = (tag: string) => {
    setState((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (isEmpty(state.title)) {
      displaySnackbar("Title is empty!");
    } else {
      await mutation.mutateAsync({ postId: postId, form: state });
    }
  }, [displaySnackbar, mutation, postId, state]);

  return (
    <>
      <PostEditor
        category={state.category}
        categoryList={categoryList}
        handleAddTag={handleAddTag}
        handleCategoryChange={handleCategoryChange}
        handleSubmit={handleSubmit}
        handlePrevPageBtn={handlePrevPageBtn}
        handleTagInput={handleTagInput}
        handleTitleChange={handleChange}
        handleContent={handleContent}
        isLoading={mutation.isLoading}
        tagInput={tagInput}
        title={state.title}
        handleTagDelete={handleTagDelete}
        content={state.content}
        tags={state.tags}
      />
      {mutation.isError ? (
        <SnackbarAlert
          snackbarState={{
            open: true,
            severity: "error",
            msg: mutation.error.message,
          }}
          onClose={() => closeSnackbar(mutation.reset)}
        />
      ) : (
        <SnackbarAlert
          snackbarState={snackbarState}
          onClose={() => closeSnackbar()}
        />
      )}
    </>
  );
}
