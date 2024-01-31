import ReactMarkdown from "react-markdown";
import type { CodeComponent } from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import cn from "classnames";
import styles from "./MarkdownRenderer.module.scss";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";
import { uniqueId } from "lodash-es";

const Code: CodeComponent = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");

  const language = match?.[1] || "text";
  const codeString = String(children).replace(/\n$/, "");

  return (
    <>
      <SyntaxHighLighter
        {...props}
        language={language}
        children={codeString}
        style={dracula}
        customStyle={{ marginBottom: "0", borderRadius: "0" }}
      />
    </>
  );
};

export default function MarkdownRenderer({ content }: { content: string }) {
  useEffect(() => {
    import("github-markdown-css/github-markdown.css");
  }, []);

  return (
    <ReactMarkdown
      className={cn("markdown-body", styles.Markdown)}
      remarkPlugins={[remarkGfm]}
      components={{
        code: Code,
        h1: ({ children, className, ...props }) => {
          const id = uniqueId();
          return (
            <h1 id={id} className={className} {...props}>
              {children}
            </h1>
          );
        },
        h2: ({ children, className, ...props }) => {
          const id = uniqueId();
          return (
            <h2 id={id} className={className} {...props}>
              {children}
            </h2>
          );
        },
        h3: ({ children, className, ...props }) => {
          const id = uniqueId();
          return (
            <h3 id={id} className={className} {...props}>
              {children}
            </h3>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
