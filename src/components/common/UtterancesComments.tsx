import { useEffect, useRef } from "react";
import "./UtterencesComments.scss";

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
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value as string);
    });

    setTimeout(() => {
      if (ref.current?.childNodes.length === 0) {
        ref.current?.append(script);
      }
    }, 300);
  }, [postId]);
  return <div ref={ref} key={postId} />;
}

export default UtterancesComments;
