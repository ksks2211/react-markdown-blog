import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../../contexts/Menu.enum";
import { useChangeMenu } from "../../hooks/useGlobal";
import type { PostCreateForm } from "@customTypes/post.types";
import { lazy, useCallback, useState } from "react";
import { useCreatePost } from "../../hooks/usePostMutation";
import { Stack, Chip } from "@mui/material";
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
import SnackbarAlert from "../../components/common/ErrorSnackbar";
import FixedButtonGroup from "./FixedButtonGroup";
import SuspenseLoader from "../../components/common/SuspenseLoader";
import PostInputGroup from "./PostInputGroup";
import { useSnackbarState } from "../../hooks/useSnackbarState";

const MarkdownEditor = lazy(
  () => import("../../components/common/MarkdownEditor")
);

const initialState = {
  title: "",
  content: "",
  tags: [],
};

const DEFAULT_CATEGORY_PARAM = "/no_category";

function PostCreatePage() {
  useChangeMenu(Menu.POSTS);

  const mutation = useCreatePost();
  const [searchParams] = useSearchParams();
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();

  const { snackbarState, displaySnackbar, closeSnackbar } = useSnackbarState();

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

  const handleSubmit = async () => {
    if (isEmpty(state.title)) {
      displaySnackbar("Title is empty!");
    } else {
      await mutation.mutateAsync({ ...state, category });
    }
  };

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

  const handlePrevPageBtn = useCallback(() => {
    if (categoryParam === DEFAULT_CATEGORY_PARAM) navigate("/posts");
    else if (searchParams.get("empty")) navigate(`/categories`);
    else navigate(`/categories${categoryParam}`);
  }, [categoryParam, navigate, searchParams]);

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setCategory(e.target.value);
  }, []);

  const handleTagInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
    },
    []
  );

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
          onClose={() => closeSnackbar(mutation.reset)}
        />
      ) : (
        <SnackbarAlert
          snackbarState={snackbarState}
          onClose={() => closeSnackbar()}
        />
      )}
    </StyledCreatePage>
  );
}

export default PostCreatePage;
