import MenuItem from "@mui/material/MenuItem";
import {
  StyledIconButton,
  StyledInputGroup,
  StyledTitleInputRow,
} from "./PostCreatePage.styles";
import { IoIosAdd } from "react-icons/io";
import { Select, SelectChangeEvent, SxProps, Theme } from "@mui/material";
import { rgba } from "polished";
import { useEnterKeyPressHandler } from "../../hooks/useHandler";

interface PostInputGroupProps {
  title: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  category: string;
  handleCategoryChange: (e: SelectChangeEvent) => void;
  categoryList: string[];
  tag: string;
  handleAddTag: () => void;
  handleTagInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectInputProps = { "aria-label": "Without label" };

const SelectSx: SxProps<Theme> = (theme) => ({
  "& > fieldset": {
    border: "none",
  },

  "& #mui-component-select-category": {
    minHeight: "1rem",
  },
  "& > *:active, & > *:focus": {
    backgroundColor: rgba(theme.palette.primary.main, 0.07),
    borderRadius: ".4em",
  },
});

export default function PostInputGroup({
  title,
  handleTitleChange,
  category,
  handleCategoryChange,
  categoryList,
  tag,
  handleAddTag,
  handleTagInput,
}: PostInputGroupProps) {
  const { enterKeyPressHandler: handleKeyDown } =
    useEnterKeyPressHandler(handleAddTag);

  return (
    <StyledInputGroup>
      <StyledTitleInputRow name="title">
        <input
          value={title}
          name="title"
          onChange={handleTitleChange}
          placeholder="Title"
          autoComplete="off"
          autoFocus
        />
      </StyledTitleInputRow>
      <StyledTitleInputRow name="category">
        <Select
          value={category}
          className="category-select"
          name="category"
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={SelectInputProps}
          sx={SelectSx}
        >
          {categoryList.map((cat) => {
            return (
              <MenuItem key={cat} value={cat}>
                <em>{cat}</em>
              </MenuItem>
            );
          })}
        </Select>
      </StyledTitleInputRow>
      <StyledTitleInputRow name="tags">
        <input
          value={tag}
          onChange={handleTagInput}
          onKeyDownCapture={handleKeyDown}
          onKeyDown={handleKeyDown}
          name="tag-input"
          autoComplete="off"
        />
        <StyledIconButton
          tabIndex={-1}
          aria-label="delete"
          size="small"
          onClick={handleAddTag}
          color="primary"
        >
          <IoIosAdd fontSize="inherit" />
        </StyledIconButton>
      </StyledTitleInputRow>
    </StyledInputGroup>
  );
}
