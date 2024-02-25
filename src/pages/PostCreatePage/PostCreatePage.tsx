import { useCallback, useEffect, useState } from "react";
import { useCreatePost } from "../../hooks/usePostMutation";
import { useErrorMessageSnackbarState } from "../../hooks/useSnackbarState";
import type { PostCreateForm } from "@customTypes/post.types";
import isEmpty from "lodash-es/isEmpty";
import { SelectChangeEvent } from "@mui/material/Select";
import SnackbarAlert from "../../components/common/ErrorSnackbar";
import PostEditor from "../../components/common/PostEditor";

interface PostCreateContainerProps {
  categoryList: string[];
  handlePrevPageBtn: () => void;
  category: string;
}

const initialState = {
  title: "",
  content: "",
  tags: [],
};

const PostCreatePage: React.FC<PostCreateContainerProps> = ({
  categoryList,
  handlePrevPageBtn,
  category,
}) => {
  const mutation = useCreatePost();

  const { snackbarState, displaySnackbar, closeSnackbar } =
    useErrorMessageSnackbarState();

  useEffect(() => {
    if (mutation.error) {
      displaySnackbar(mutation.error.message);
    }
  }, [mutation.error, displaySnackbar]);

  const [state, setState] = useState<PostCreateForm>({
    ...initialState,
    category,
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleContent = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      content: value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isEmpty(state.title)) {
      displaySnackbar("Title is empty!");
    } else {
      await mutation.mutateAsync(state);
    }
  }, [displaySnackbar, mutation, state]);

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

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setState((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  }, []);

  const handleTagDelete = (tag: string) => {
    setState((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleTagInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
    },
    []
  );

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
      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={() => closeSnackbar(mutation.reset)}
      />
    </>
  );
};

export default PostCreatePage;
