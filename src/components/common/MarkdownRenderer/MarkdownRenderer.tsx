import ReactMarkdown from "react-markdown";
import type { CodeComponent } from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import cn from "classnames";
import styles from "./MarkdownRenderer.module.scss";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";

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
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
