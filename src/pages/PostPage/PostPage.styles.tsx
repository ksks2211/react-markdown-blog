import { styled } from "@mui/material";

import { darken } from "polished";

export const StyledPostPage = styled("div")`
  display: flex;
  width: 100%;
  flex-flow: column;

  /* padding: 0 1rem; */
  min-height: 70vh;

  ${(props) => props.theme.breakpoints.up("md")} {
    /* margin: 3.5rem 3.5rem 0; */
  }
`;

export const StyledPrevPageBtn = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
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

  // Delete btn
  div.delete-btn {
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

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
      bottom: 75%;
      opacity: 1;
      animation-delay: 0.5s;
      animation: fadeInTooltip 0.5s ease-in-out forwards;
      color: ${(props) => props.theme.palette.warning.dark};
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
export const StyledPostList = styled("div")``;
