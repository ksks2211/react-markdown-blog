import { styled } from "@mui/material";
import { darken, rgba } from "polished";

export const StyledCategoriesCard = styled("div")`
  border-radius: 0.4rem;
  box-shadow: 0 1px 2px ${rgba(84, 83, 83, 0.1)},
    0 2px 1px ${rgba(0, 0, 0, 0.1)};
  padding: 0;
  display: flex;
  flex-flow: column;
  color: ${(props) => props.theme.palette.grey[800]};
`;
export const StyledRowWithSubRows = styled("div")<{ depth: number }>`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  & > & {
    border-top: 1px solid hsla(0, 0%, 0%, 0.125);
  }
`;
interface StyledRowProps {
  subRowsOpen: boolean;
  marked: boolean;
  depth: number;
}
export const StyledRow = styled("div")<StyledRowProps>`
  transition: 0.4s;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 3rem;
  display: flex;
  justify-content: start;
  padding-left: 1rem;

  background-color: ${(props) =>
    props.marked ? rgba(props.theme.palette.grey[800], 0.1) : "#fff"};

  &.row-close ~ .rows-container {
    & .row-wrapper {
      opacity: 0;
      margin-bottom: -3rem;
      visibility: hidden;
    }
    border: none;
  }

  &::before {
    display: inline-flex;
    content: "";
    width: ${(props) => props.depth + "rem"};
    height: 100%;
  }
`;
export const StyledCategoryDropdownBtn = styled("div")<{
  subRowsOpen: boolean;
  canToggle: boolean;
}>`
  justify-self: end;
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: center;
  margin-right: 1.8rem;
  gap: 0.3rem;
  height: 100%;

  .category-posts-count {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: ${(props) => props.theme.palette.grey[600]};
  }

  & > .arrow {
    .arrow-icon {
      z-index: 10;
      transform: ${(props) =>
        props.subRowsOpen ? "rotate(0deg)" : " rotate(-90deg)"};
      font-size: 2rem;
      border-radius: 50%;
      transition: transform 0.4s;
    }

    visibility: ${(props) => (props.canToggle ? "visible" : "hidden")};
  }

  & > .arrow:hover {
    .arrow-icon {
      background-color: ${(props) => rgba(props.theme.palette.grey[800], 0.1)};
    }
  }

  & > .arrow {
    right: 1rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
export const StyledCategoryTitle = styled("div")`
  display: flex;
  align-items: center;
  height: 100%;

  .category-name {
    font-size: 1.1rem;
    font-weight: 500;
    margin-left: 0.2rem;
    margin-right: 1.1rem;
    padding: 0 0.5rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => rgba(props.theme.palette.grey[700], 0.8)};

    &:hover,
    &.bold {
      color: ${(props) => darken(0.1, props.theme.palette.warning.dark)};
    }
  }

  .folder-icon {
    color: ${(props) => props.theme.palette.grey[700]};
    font-size: 1.3rem;
  }

  .count {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => rgba(props.theme.palette.warning.main, 0.8)};
    box-shadow: 0 0 3px ${(props) => props.theme.palette.warning.main};

    font-weight: 700;

    border-radius: 50%;
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.7rem;
    color: #fff;
    transform: translateX(0.6rem) translateY(-0.6rem);
  }

  .update-icon,
  .delete-icon {
    font-size: 1.2rem;
    margin-right: 0.4rem;
    cursor: pointer;

    fill: ${(props) => props.theme.palette.grey[600]};

    &:hover {
      fill: ${(props) => props.theme.palette.grey[800]};
    }
  }
`;
