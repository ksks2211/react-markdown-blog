import { Link } from "react-router-dom";
import { StyledPrevAndNextPostBtn } from "./PostPage.styles";
import type { PrevAndNextPosts } from "@customTypes/post.types";
import { styled } from "@mui/material";
import { darken, rgba } from "polished";
import cn from "classnames";

interface PrevAndNextPostBtnProps {
  prevAndNextPosts: PrevAndNextPosts;
}

const StyledLink = styled(Link)<{ isPrev: boolean; disabled: boolean }>`
  &::before {
    display: flex;
    font-size: 0.9rem;
    transform: translateY(-0.8rem);
  }

  span {
    color: ${(props) => darken(0.2, props.theme.global.btnColor)};
    font-weight: 600;
    transition: 0.4s ease-out;
    min-height: 1.8rem;
  }

  &.btn-prev {
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }

  &.btn-prev::before {
    content: "PREV";
  }

  &.btn-next {
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }

  &.btn-next::before {
    content: "NEXT";
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
        isPrev={true}
        disabled={!prevAndNextPosts.hasPrev}
        to={`/posts/${prevAndNextPosts.prev?.id}`}
        className={cn("btn-prev", { disabled: !prevAndNextPosts.hasPrev })}
      >
        <span>
          {prevAndNextPosts.hasPrev ? prevAndNextPosts.prev.title : "None"}
        </span>
      </StyledLink>
      <StyledLink
        isPrev={false}
        disabled={!prevAndNextPosts.hasNext}
        to={`/posts/${prevAndNextPosts.next?.id}`}
        className={cn("btn-next", { disabled: !prevAndNextPosts.hasNext })}
      >
        <span>
          {prevAndNextPosts.hasNext ? prevAndNextPosts.next.title : "None"}
        </span>
      </StyledLink>
    </StyledPrevAndNextPostBtn>
  );
}
