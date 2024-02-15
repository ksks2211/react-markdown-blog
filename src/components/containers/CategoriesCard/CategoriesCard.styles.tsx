import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import { darken, rgba } from "polished";

export const StyledCategoriesCard = styled("div")`
  width: 100%;
  border-radius: 0.4rem;
  box-shadow: -1px -1px 2px ${rgba(84, 83, 83, 0.1)},
    2px 2px 5px ${rgba(0, 0, 0, 0.1)};

  display: flex;
  flex-flow: column;
  overflow: hidden;

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

  justify-content: start;

  height: 2.5rem;
  display: flex;

  background-color: ${(props) =>
    props.marked ? rgba(props.theme.palette.grey[700], 0.1) : "transparent"};

  &.row-close ~ .rows-container {
    & .row-wrapper {
      opacity: 0;
      margin-bottom: -2.5rem;
      visibility: hidden;

      ${(props) => props.theme.breakpoints.up("md")} {
        margin-bottom: -3rem;
      }
    }
    border: none;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    height: 3rem;
    padding-left: 1rem;
  }
`;

interface DropDownBtnProps {
  subRowsOpen: boolean;
  canToggle: boolean;
}

export const StyledCategoryDropdownBtn = styled("div")<DropDownBtnProps>`
  min-width: 20%;

  justify-self: end;
  margin-left: auto;

  display: flex;
  justify-content: end;
  align-items: center;

  height: 100%;

  .category-posts-count {
    width: 3rem;
    flex-grow: 0;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: ${(props) => props.theme.palette.grey[600]};
  }

  & > .arrow {
    flex-grow: 0;
    flex-shrink: 0;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.3rem;
    cursor: pointer;
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

  ${(props) => props.theme.breakpoints.up("md")} {
    padding-right: 1.8rem;
  }
`;
export const StyledCategoryTitle = styled("div")<{ depth: number }>`
  min-width: 50%;
  max-width: 80%;

  display: flex;
  align-items: center;
  height: 100%;
  padding-left: ${(props) => "calc(" + props.depth + " * .25rem)"};

  .category-name {
    max-width: 14rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0.5rem;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;

    color: ${(props) => rgba(props.theme.palette.grey[800], 0.9)};

    &:hover,
    &.bold {
      color: ${(props) => darken(0.1, props.theme.palette.warning.dark)};
    }
  }

  .folder-icon {
    margin-left: 0.75rem;
    flex-grow: 0;
    flex-shrink: 0;
    color: ${(props) => props.theme.palette.grey[700]};
    font-size: 1rem;
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
    width: 1.1rem;
    height: 1.1rem;
    font-size: 0.6rem;
    color: #fff;
    transform: translateX(0.3rem) translateY(-0.5rem);
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

  ${(props) => props.theme.breakpoints.up("md")} {
    .folder-icon {
      font-size: 1.3rem;
    }

    .category-name {
      font-size: 1.1rem;
      margin-right: 1rem;
    }

    .count {
      width: 1.3rem;
      height: 1.3rem;

      transform: translateX(0.2rem) translateY(-0.6rem);
    }
  }
`;
export const StyledWarning = styled(Box)`
  color: ${(props) => props.theme.palette.error.main};
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 0.8rem;
  line-height: 1rem;

  &::before {
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 0.7rem;
    content: "∗";
    display: flex;
  }
`;
