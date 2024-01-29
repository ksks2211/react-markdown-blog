import { styled } from "@mui/material";

import { darken } from "polished";

export const StyledPrevPageBtn = styled("div")`
  height: 2rem;
  display: flex;
  align-items: center;

  svg {
    border-radius: 0.2rem;
    color: #fff;
    font-size: 1.6rem;
    background-color: ${(props) => props.theme.global.mainColor};
    cursor: pointer;
    transition: 0.2s ease-out;
    transform: scale(1.3);

    &:hover {
      background-color: ${(props) =>
        darken(0.05, props.theme.global.mainColor)};
    }
  }
`;
export const StyledPostPage = styled("div")`
  margin: 2rem 2rem;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 3.5rem 3.5rem 0;
  }
`;
export const StyledPrevAndNextPostBtn = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;

  a {
    display: flex;
    flex-flow: column;
    width: 50%;
    border: 1px solid ${(props) => props.theme.global.btnColor};
    height: 6rem;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: 0.4s ease-out;

    &:hover {
      background-color: ${(props) => props.theme.global.btnColor};
      color: #fff;

      span {
        color: #fff !important;
      }
    }
  }
`;
export const StyledMainPost = styled("div")`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;
export const StyledPostMeta = styled("div")`
  padding: 1rem 0 2rem;
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    display: flex;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
    color: ${(props) => props.theme.palette.grey[800]};
    justify-content: space-between;

    // Delete btn
    div {
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
  }
`;
