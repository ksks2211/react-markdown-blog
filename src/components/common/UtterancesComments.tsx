/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import { css } from "@mui/material";

const style = css`
  & .utterances {
    max-width: none;
  }
  padding: 0 0.8rem;
`;

function UtterancesComments({ postId }: { postId: number }) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "ksks2211/utterances",
      "issue-term": "pathname",
      theme: "github-light",
      crossOrigin: "anonymous",
      defer: true,
      async: true,
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value as string);
    });

    const container = ref.current;

    setTimeout(() => {
      if (container?.childNodes.length === 0) {
        container?.append(script);
      }
    }, 300);

    return () => {
      script.remove();
      if (container) container.innerHTML = "";
    };
  }, [postId]);

  return (
    <>
      <div css={style} ref={ref} key={postId}></div>
    </>
  );
}

export default UtterancesComments;
