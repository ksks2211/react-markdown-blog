import { IconButton, styled } from "@mui/material";

export const StyledSearchTag = styled("div")`
  width: 95%;
  margin: 2rem auto;
  min-height: 30vh;
  position: relative;
  flex-flow: column;
`;

export const StyledIconButton = styled(IconButton)`
  svg {
    transform: scale(1.3);
    fill: ${(props) => props.theme.palette.primary.dark};
  }
`;
export const StyledToggleWrapper = styled("div")`
  width: 90%;
  margin: 1rem auto 3rem;
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex-flow: column;
  gap: 0.6rem;
`;

export const StyledToggleBtnContainer = styled("div")`
  /* max-width: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;

  .toggle-desc {
    flex-grow: 0;
    flex-shrink: 0;
    width: 6rem;
    font-size: 0.85rem;
    margin-right: 0.5rem;
    font-weight: 600;
    text-align: right;
  }
`;
export const StyledTagsInputGroup = styled("div")`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: auto;
  .title {
    flex: 0 0 6rem;
    height: 100%;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.palette.grey[800]};
  }

  .icon {
    flex: 0 0 2rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.6rem;
  }
`;
export const StyledTagInputWrap = styled("div")`
  flex: 1 1;
  min-width: 10rem;
  border: none;
  position: relative;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: start;
`;

export const StyledInput = styled("input")`
  height: 90%;
  width: 90%;
  font-size: 1.1rem;
  line-height: 1.5rem;
  border: none;
  box-shadow: 0 0 1px ${(props) => props.theme.palette.primary.dark};
  outline: none;

  &:active,
  &:focus {
    box-shadow: 0 0 2px 1px ${(props) => props.theme.palette.primary.dark};
  }
`;
