import { useNavigate, useSearchParams } from "react-router-dom";
import Menu from "../../contexts/Menu.enum";
import { useChangeMenu } from "../../hooks/useGlobal";
import { PostCreateForm } from "../../types/post.types";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useCreatePost } from "../../hooks/usePostMutation";
import MarkdownEditor from "../../components/common/MarkdownEditor";
import { ButtonGroup, IconButton, Stack, styled } from "@mui/material";
import { capitalizeFirst } from "../../helpers/stringUtils";
import { IoIosAdd } from "react-icons/io";
import { darken } from "polished";
import { MdArrowBack } from "react-icons/md";
import useBreakpoints from "../../hooks/useBreakPoints";

const initialState = {
  title: "",
  content: "",
  tags: [],
};

const StyledCreatePage = styled("div")`
  --editor-color: ${(props) => props.theme.palette.grey[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 1rem 3rem;
  }
`;

const StyledInputGroup = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.breakpoints.up("md")} {
    flex-direction: row;
    flex-wrap: wrap;

    border-top: none;
  }
`;

const StyledWrapper = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  width: 100%;
  border-radius: 1rem;
`;
const StyledTitleInput = styled("div")<{ name: string }>`
  width: 100%;

  border: none;
  position: relative;

  input {
    width: 100%;
    height: 3.4rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    border: none;
    padding-left: 8rem;
    &:focus {
      outline: none;
      border: none;
    }
  }

  &:before {
    content: "${(props) => capitalizeFirst(props.name)}";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    color: ${(props) => darken(0.1, props.theme.palette.primary.main)};
    width: 8rem;
  }

  border-bottom: 1px solid var(--editor-color);

  &:last-of-type {
    border-bottom: none;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    flex: 1 1 50%;
    flex-direction: row;
    border-top: none;
    border-bottom: none;

    &:first-of-type {
      border-right: 1px solid var(--editor-color);
    }
    &:last-of-type {
      border-top: 1px solid var(--editor-color);
      width: 100%;
      flex: 1 1 100%;
      border-right: none;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: var(--editor-color);
  font-size: 1.5rem;
  margin-left: 5.5rem;
`;

const StyledButtonFixed = styled("div")`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: transparent;

  display: flex;
  align-items: start;
  justify-content: end;
  padding: 0 3rem;

  ${(props) => props.theme.breakpoints.up("md")} {
    height: 5rem;
    padding: 0 5.6rem;
  }
`;

const DEFAULT_CATEGORY_PARAM = "xxx-no_category";

function PostCreatePage() {
  useChangeMenu(Menu.POSTS);

  const mutation = useCreatePost();
  const [searchParams] = useSearchParams();
  const { isLg } = useBreakpoints();
  const navigate = useNavigate();

  const categoryParam = searchParams.get("category") || DEFAULT_CATEGORY_PARAM;
  const category = `/${categoryParam.split("-").splice(1).join("/")}`;
  const [state, setState] =
    useState<Omit<PostCreateForm, "category">>(initialState);

  const [tagInput, setTagInput] = useState("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    console.log({ category });
    await mutation.mutateAsync({ ...state, category });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !state.tags.includes(tag)) {
      setState({
        ...state,
        tags: [...state.tags, tag],
      });
      setTagInput("");
    }
  };

  const handlePrevPageBtn = () => {
    if (categoryParam === DEFAULT_CATEGORY_PARAM) navigate("/posts");
  };

  return (
    <StyledCreatePage onSubmit={handleSubmit}>
      <StyledWrapper>
        <StyledInputGroup>
          <StyledTitleInput name="title">
            <input
              value={state.title}
              name="title"
              onChange={handleChange}
              placeholder="Title"
            />
          </StyledTitleInput>
          <StyledTitleInput name="category">
            <input value={category} name="category" disabled />
          </StyledTitleInput>
          <StyledTitleInput name="tags">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              name="tag-input"
            />
            <StyledIconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                handleAddTag(tagInput);
              }}
              color="primary"
            >
              <IoIosAdd fontSize="inherit" />
            </StyledIconButton>
          </StyledTitleInput>
        </StyledInputGroup>
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
        <MarkdownEditor value={state.content} onChange={handleContent} />
      </StyledWrapper>

      <StyledButtonFixed>
        <ButtonGroup variant="outlined" size={isLg ? "large" : "small"}>
          <Button
            type="button"
            color="primary"
            startIcon={<MdArrowBack />}
            onClick={handlePrevPageBtn}
          >
            Prev
          </Button>
          <Button type="button" color="primary">
            Submit
          </Button>
        </ButtonGroup>
      </StyledButtonFixed>
    </StyledCreatePage>
  );
}

export default PostCreatePage;
