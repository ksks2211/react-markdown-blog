import { Link } from "react-router-dom";
import { StyledPrevAndNextPostBtn } from "./PostPage.styles";
import type { PrevAndNextPosts } from "@customTypes/post.types";
import { styled } from "@mui/material";
import { darken, rgba } from "polished";
import cn from "classnames";

interface PrevAndNextPostBtnProps {
  prevAndNextPosts: PrevAndNextPosts;
}

const StyledLink = styled(Link)<{ disabled: boolean }>`
  display: flex;
  flex-flow: column;
  width: 50%;
  flex-grow: 0;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.global.btnColor};
  height: 6rem;
  align-items: center;
  justify-content: start;
  position: relative;
  transition: 0.4s ease-out;

  .post-link-title {
    color: ${(props) => darken(0.2, props.theme.global.btnColor)};
    font-weight: 600;
    transition: 0.4s ease-out;

    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 90%;
  }

  &:hover {
    background-color: ${(props) => props.theme.global.btnColor};
    color: #fff;

    span {
      color: #fff !important;
    }
  }

  &::before {
    width: 100%;
    display: flex;
    margin: 0.7rem 0 0.35rem;
    justify-content: center;

    font-size: 0.9rem;
    text-align: center;
    flex-shrink: 0;
    flex-grow: 0;
  }

  &.btn-prev {
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }

  &.btn-prev::before {
    content: "PREV";
  }

  &.btn-next::before {
    content: "NEXT";
  }

  &.btn-next {
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }

  &.disabled {
    border: 1px solid ${(props) => rgba(props.theme.palette.grey[800], 0.2)};
    pointer-events: none;

    span {
      color: ${(props) => rgba(props.theme.palette.grey[800], 0.2)};
    }
  }
`;
export default function PrevAndNextPostBtn({
  prevAndNextPosts,
}: PrevAndNextPostBtnProps) {
  return (
    <StyledPrevAndNextPostBtn>
      <StyledLink
        disabled={!prevAndNextPosts.hasPrev}
        to={`/posts/${prevAndNextPosts.prev?.id}`}
        className={cn("btn-prev", { disabled: !prevAndNextPosts.hasPrev })}
      >
        <span className="post-link-title">
          {prevAndNextPosts.hasPrev ? prevAndNextPosts.prev.title : "None"}
        </span>
      </StyledLink>
      <StyledLink
        disabled={!prevAndNextPosts.hasNext}
        to={`/posts/${prevAndNextPosts.next?.id}`}
        className={cn("btn-next", { disabled: !prevAndNextPosts.hasNext })}
      >
        <span className="post-link-title">
          {prevAndNextPosts.hasNext ? prevAndNextPosts.next.title : "None"}
        </span>
      </StyledLink>
    </StyledPrevAndNextPostBtn>
  );
}
