import MenuItem from "@mui/material/MenuItem";
import {
  StyledIconButton,
  StyledInputGroup,
  StyledTitleInput,
} from "./PostCreatePage.styles";
import { IoIosAdd } from "react-icons/io";
import { Select, SelectChangeEvent } from "@mui/material";
import { rgba } from "polished";
import { useCallback } from "react";

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
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddTag();
      }
    },
    [handleAddTag]
  );

  return (
    <StyledInputGroup>
      <StyledTitleInput name="title">
        <input
          value={title}
          name="title"
          onChange={handleTitleChange}
          placeholder="Title"
          autoComplete="off"
          autoFocus
        />
      </StyledTitleInput>
      <StyledTitleInput name="category">
        <Select
          value={category}
          className="category-select"
          name="category"
          onChange={handleCategoryChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& > fieldset": {
              border: "none",
            },

            "& #mui-component-select-category": {
              minHeight: "1rem",
            },
            "& > *:active, & > *:focus": {
              backgroundColor: (theme) =>
                rgba(theme.palette.primary.main, 0.07),
              borderRadius: ".4em",
            },
          }}
        >
          {categoryList.map((cat) => {
            return (
              <MenuItem key={cat} value={cat}>
                <em>{cat}</em>
              </MenuItem>
            );
          })}
        </Select>
      </StyledTitleInput>
      <StyledTitleInput name="tags">
        <input
          value={tag}
          onChange={handleTagInput}
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
      </StyledTitleInput>
    </StyledInputGroup>
  );
}
