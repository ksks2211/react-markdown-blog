import { useChangeMenu, useUsername } from "../../hooks/useGlobal";
import Menu from "../../contexts/Menu.enum";
import withLayout from "../../hoc/withLayout";
import { useMemo, useState } from "react";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import { Box, Chip, Stack, SxProps } from "@mui/material";
import { useEnterKeyPressHandler } from "../../hooks/useHandler";
import { IoIosAdd } from "react-icons/io";
import includes from "lodash-es/includes";
import { isEmpty } from "lodash-es";
import {
  StyledSearchTag,
  StyledToggleWrapper,
  StyledTagsInputGroup,
  StyledIconButton,
  StyledTagInputWrap,
  StyledInput,
  StyledToggleBtnContainer,
} from "./StyledSearchTag";
import PostsSearchList from "./PostsSearchList";

const STACK_STYLE: SxProps = {
  minHeight: "3rem",
  flexWrap: "wrap",
};

const Data: React.FC = () => {
  useChangeMenu(Menu.TAGS);

  // Search Options
  const [isOnlyMyPosts, setIsOnlyMyPosts] = useState(false);
  const [isAllTags, setIsAllTags] = useState(false);

  // Search Tags
  const [tags, setTags] = useState<string[]>([]);

  // Search Tag Input value
  const [tag, setTag] = useState("");

  // User Id
  const username = useUsername();

  // Generate Search Parameters
  const params = useMemo(
    () =>
      isOnlyMyPosts
        ? { tags, writer: username, allTags: isAllTags }
        : { tags, allTags: isAllTags },
    [isAllTags, isOnlyMyPosts, tags, username]
  );

  const hasSearchTags = tags.length > 0;

  const handleTagDelete = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagDeleteFunctions = tags.map(
    (tag) => () => handleTagDelete(tag)
  );

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleAddTag = () => {
    if (!isEmpty(tag) && !includes(tags, tag)) {
      setTags((prev) => [...prev, tag]);
    }
    setTag("");
  };

  const toggleAllTags = () => setIsAllTags((prev) => !prev);
  const toggleOnlyMyPosts = () => setIsOnlyMyPosts((prev) => !prev);

  const { enterKeyPressHandler: handleKeyDown } =
    useEnterKeyPressHandler(handleAddTag);

  const isAllTagsText = isAllTags ? "All tags" : "Any tags";
  const isOnlyMyPostsText = isOnlyMyPosts ? "Only my posts" : "All posts";

  return (
    <>
      <StyledSearchTag>
        <StyledToggleWrapper>
          <StyledToggleBtnContainer>
            <p className="toggle-desc">{isAllTagsText}</p>
            <ToggleSwitch
              className="toggle-btn"
              isOn={isAllTags}
              handleToggle={toggleAllTags}
            />
          </StyledToggleBtnContainer>
          <StyledToggleBtnContainer>
            <p className="toggle-desc">{isOnlyMyPostsText}</p>
            <ToggleSwitch
              className="toggle-btn"
              isOn={isOnlyMyPosts}
              handleToggle={toggleOnlyMyPosts}
            />
          </StyledToggleBtnContainer>
        </StyledToggleWrapper>

        <StyledTagsInputGroup>
          <h3 className="title">Search Tags</h3>
          <StyledIconButton
            className="icon"
            tabIndex={-1}
            aria-label="add"
            size="small"
            onClick={handleAddTag}
            color="primary"
          >
            <IoIosAdd fontSize="inherit" />
          </StyledIconButton>
          <StyledTagInputWrap>
            <StyledInput
              autoFocus
              value={tag}
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              name="tag-input"
              autoComplete="off"
            />
          </StyledTagInputWrap>
        </StyledTagsInputGroup>

        <Stack
          sx={STACK_STYLE}
          marginX={5}
          marginY={3}
          gap={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="row-reverse"
        >
          {tags.map((tag, index) => (
            <Chip
              key={tag}
              label={tag}
              data-tag-value={tag}
              color="primary"
              variant="outlined"
              onDelete={handleTagDeleteFunctions[index]}
            />
          ))}
        </Stack>
      </StyledSearchTag>

      {!hasSearchTags ? (
        <Box minHeight="15rem" />
      ) : (
        <PostsSearchList params={params} />
      )}
    </>
  );
};

const DataWithLayout = withLayout(Data);

export default DataWithLayout;
