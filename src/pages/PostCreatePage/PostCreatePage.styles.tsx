import { IconButton, styled } from "@mui/material";

import { darken, rgba } from "polished";

import { capitalizeFirst } from "../../helpers/stringUtils";

const TITLE_WIDTH = "8rem";

export const StyledCreatePage = styled("div")`
  --editor-color: ${(props) => props.theme.palette.grey[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 1rem 3rem;
  }
`;
export const StyledInputGroup = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.breakpoints.up("md")} {
    flex-direction: row;
    flex-wrap: wrap;

    border-top: none;
  }
`;
export const StyledWrapper = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  width: 100%;
  overflow: hidden;
`;
export const StyledTitleInput = styled("div")<{ name: string }>`
  width: 100%;

  border: none;
  position: relative;

  input,
  .category-select {
    width: calc(100% - ${TITLE_WIDTH} - 1.8rem);
    height: 3.4rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    border: none;
    margin-left: ${TITLE_WIDTH};
    &:focus,
    &:active {
      outline: none;
      border: none;

      background-color: ${(props) =>
        rgba(props.theme.palette.primary.light, 0.07)};
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
    width: ${TITLE_WIDTH};
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
export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: var(--editor-color);
  font-size: 1.5rem;
  margin-left: 5.5rem;
`;
export const StyledFixedButtonGroup = styled("div")`
  position: fixed;

  height: 2.4rem;
  right: 3rem;
  bottom: 2.5rem;
  background-color: transparent;
  display: flex;

  ${(props) => props.theme.breakpoints.up("md")} {
    right: 5rem;
    height: 3.5rem;
    bottom: 3.5rem;
  }
`;
