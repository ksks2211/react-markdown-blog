import { styled } from "@mui/material";
import { darken } from "polished";

export const StyledPostPage = styled("div")`
  display: flex;
  width: 100%;
  flex-flow: column;
  min-height: 70vh;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 2rem 4rem 0;
  }
`;

export const StyledUpperNavigation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;

  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 1.5rem 0 2.5rem;
  }

  svg,
  .icon-btn {
    cursor: pointer;
    color: #fff;
    border-radius: 0.2rem;
    font-size: 2.2rem;
    background-color: ${(props) => props.theme.global.mainColor};
    transition: 0.4s ease-out;

    &:hover {
      background-color: ${(props) =>
        darken(0.07, props.theme.global.mainColor)};
    }
  }
`;

export const StyledPrevAndNextPostBtn = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  padding: 0 1rem;
`;

export const StyledPostMeta = styled("div")`
  padding: 1rem 0 2rem;
`;

export const StyledTitle = styled("h1")`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  display: flex;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.palette.grey[800]};
  justify-content: space-between;

  .post-owner-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .post-owner-btn {
      flex: 0 0;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
    }
  }

  // Delete btn
  .delete-btn {
    svg {
      fill: ${(props) => props.theme.palette.warning.main};
      &:hover {
        fill: ${(props) => props.theme.palette.warning.dark};
      }
    }
    &:hover::after {
      position: absolute;
      display: block;
      content: "Delete";
      display: block;
      font-size: 0.75rem;
      bottom: 100%;
      opacity: 1;
      animation-delay: 0.5s;
      animation: fadeInTooltip 0.5s ease-in-out forwards;
      color: ${(props) => props.theme.palette.warning.dark};
      text-shadow: none;
    }
  }

  // edit
  .edit-btn {
    svg {
      fill: ${(props) => props.theme.palette.success.main};
      &:hover {
        fill: ${(props) => props.theme.palette.success.dark};
      }
    }
    &:hover::after {
      position: absolute;
      display: block;
      content: "Edit";
      display: block;
      font-size: 0.75rem;
      bottom: 100%;
      opacity: 1;
      animation-delay: 0.5s;
      animation: fadeInTooltip 0.5s ease-in-out forwards;
      color: ${(props) => props.theme.palette.success.main};
      text-shadow: none;
    }
  }
`;

const StyledPostMetadata = styled("div")`
  font-size: 0.75rem;
  label {
    color: rgba(100, 100, 100.7);
    margin-right: 0.3rem;
  }
`;

export const StyledTimeMetadata = styled(StyledPostMetadata)`
  margin-top: 0.6rem;
  time::after {
    content: "•";
    margin: 0 5px;
  }

  time:last-child::after {
    content: "";
  }
`;

export const StyledPostDetails = styled(StyledPostMetadata)`
  display: flex;
  justify-content: space-between;
`;

export const StyledMainPost = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

export const StyledPostList = styled("div")`
  width: 100%;
`;
