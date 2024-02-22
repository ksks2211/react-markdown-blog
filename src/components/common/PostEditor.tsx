import { SelectChangeEvent } from "@mui/material/Select";
import {
  StyledCreatePage,
  StyledInputGroup,
  StyledWrapper,
} from "../../pages/PostCreatePage/PostCreatePage.styles";
import PostInputGroup from "../../pages/PostCreatePage/PostInputGroup";
import useBreakpoints from "../../hooks/useBreakPoints";
import FixedButtonGroup from "../../pages/PostCreatePage/FixedButtonGroup";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import SuspenseLoader from "./SuspenseLoader";
import MarkdownEditor from "./MarkdownEditor";

const STACK_STYLE = { minHeight: "3rem", flexWrap: "wrap" };

interface PostEditorProps {
  title: string;
  tagInput: string;
  category: string;
  categoryList: string[];
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  handleAddTag: () => void;
  handleTagInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrevPageBtn: () => void;
  handleSubmit: () => void;
  handleContent: (value: string) => void;
  isLoading: boolean;
  tags: string[];
  handleTagDelete: (value: string) => void;
  content: string;
}

export default function PostEditor({
  category,
  tagInput,
  title,
  categoryList,
  handleTitleChange,
  handleCategoryChange,
  handleAddTag,
  handleTagInput,
  handlePrevPageBtn,
  handleSubmit,
  handleTagDelete,
  isLoading,
  tags,
  handleContent,
  content,
}: PostEditorProps) {
  const { isLg } = useBreakpoints();

  return (
    <StyledCreatePage>
      <StyledWrapper>
        <PostInputGroup
          category={category}
          tag={tagInput}
          title={title}
          handleTitleChange={handleTitleChange}
          handleAddTag={handleAddTag}
          handleTagInput={handleTagInput}
          categoryList={categoryList}
          handleCategoryChange={handleCategoryChange}
        />

        <StyledInputGroup>
          <Stack
            sx={STACK_STYLE}
            ml={3}
            mr={3}
            mb={1}
            gap={1}
            alignItems="center"
            justifyContent="start"
            flexDirection="row-reverse"
          >
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                variant="outlined"
                onDelete={() => handleTagDelete(tag)}
              />
            ))}
          </Stack>
        </StyledInputGroup>

        <SuspenseLoader>
          <MarkdownEditor value={content} onChange={handleContent} />
        </SuspenseLoader>
      </StyledWrapper>

      <FixedButtonGroup
        isLg={isLg}
        isLoading={isLoading}
        onPrevPageBtnClick={handlePrevPageBtn}
        onSubmitBtnClick={handleSubmit}
      />
    </StyledCreatePage>
  );
}
