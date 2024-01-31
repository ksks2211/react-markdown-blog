import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../../contexts/Menu.enum";
import { useChangeMenu } from "../../hooks/useGlobal";
import type { PostCreateForm } from "@customTypes/post.types";
import { lazy, useState } from "react";
import { useCreatePost } from "../../hooks/usePostMutation";
import { Stack, Chip, AlertColor } from "@mui/material";
import { includes, isEmpty } from "lodash-es";
import { SelectChangeEvent } from "@mui/material/Select";
import useBreakpoints from "../../hooks/useBreakPoints";
import {
  StyledCreatePage,
  StyledWrapper,
  StyledInputGroup,
} from "./PostCreatePage.styles";
import Loader from "../../components/common/Loader";
import { useGetCategoryList } from "../../hooks/useCategory";
import ErrorFallback from "../../errors/ErrorFallback";
import SnackbarAlert from "./SnackbarAlert";
import FixedButtonGroup from "./FixedButtonGroup";
import SuspenseLoader from "../../components/common/SuspenseLoader";
import PostInputGroup from "./PostInputGroup";

const MarkdownEditor = lazy(
  () => import("../../components/common/MarkdownEditor")
);

const initialState = {
  title: "",
  content: "",
  tags: [],
};

const initialSnackbarState = {
  open: false,
  severity: "error" as AlertColor,
  msg: "",
};

const DEFAULT_CATEGORY_PARAM = "/no_category";

function PostCreatePage() {
  useChangeMenu(Menu.POSTS);

  const mutation = useCreatePost();
  const [searchParams] = useSearchParams();
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();

  const [snackbarState, setSnackbarState] = useState(initialSnackbarState);

  const categoryParam = searchParams.get("category") || DEFAULT_CATEGORY_PARAM;
  const [category, setCategory] = useState(categoryParam);
  const [state, setState] =
    useState<Omit<PostCreateForm, "category">>(initialState);

  const [tagInput, setTagInput] = useState("");

  const { data, isLoading, error, refetch } = useGetCategoryList();

  const categoryList = data?.categories || [];
  if (!includes(categoryList, category)) {
    categoryList.push(category);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleContent = (value: string) => {
    setState({
      ...state,
      content: value,
    });
  };

  const handleSubmit = async () => {
    if (isEmpty(state.title)) {
      setSnackbarState({
        open: true,
        severity: "error",
        msg: "Title is empty!",
      });
    } else {
      await mutation.mutateAsync({ ...state, category });
    }
  };

  const handleAddTag = () => {
    if (tagInput && !state.tags.includes(tagInput)) {
      setState({
        ...state,
        tags: [...state.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handlePrevPageBtn = () => {
    if (categoryParam === DEFAULT_CATEGORY_PARAM) navigate("/posts");
    else if (searchParams.get("empty")) navigate(`/categories`);
    else navigate(`/categories${categoryParam}`);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

  return (
    <StyledCreatePage>
      <StyledWrapper>
        <PostInputGroup
          category={category}
          tag={tagInput}
          title={state.title}
          handleTitleChange={handleChange}
          handleAddTag={handleAddTag}
          handleTagInput={handleTagInput}
          categoryList={categoryList}
          handleCategoryChange={handleCategoryChange}
        />

        <StyledInputGroup>
          <Stack
            sx={{ minHeight: "3rem", flexWrap: "wrap" }}
            ml={3}
            mr={3}
            mb={1}
            gap={1}
            alignItems="center"
            justifyContent="start"
            flexDirection="row-reverse"
          >
            {state.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                variant="outlined"
                onDelete={() => {
                  setState((prev) => ({
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                  }));
                }}
              />
            ))}
          </Stack>
        </StyledInputGroup>

        <SuspenseLoader>
          <MarkdownEditor value={state.content} onChange={handleContent} />
        </SuspenseLoader>
      </StyledWrapper>

      <FixedButtonGroup
        isLg={isLg}
        isLoading={mutation.isLoading}
        onPrevPageBtnClick={handlePrevPageBtn}
        onSubmitBtnClick={handleSubmit}
      />

      {mutation.isError ? (
        <SnackbarAlert
          snackbarState={{
            open: true,
            severity: "error",
            msg: mutation.error.message,
          }}
          onClose={() =>
            setSnackbarState((prev) => {
              mutation.reset();
              return { ...prev, open: false };
            })
          }
        />
      ) : (
        <SnackbarAlert
          snackbarState={snackbarState}
          onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        />
      )}
    </StyledCreatePage>
  );
}

export default PostCreatePage;
