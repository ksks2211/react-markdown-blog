import ReactMarkdown from "react-markdown";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import cn from "classnames";
import styles from "./MarkdownRenderer.module.scss";
import remarkGfm from "remark-gfm";

import "github-markdown-css/github-markdown.css";

const Code: CodeComponent = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");

  const language = match?.[1] || "text";
  const codeString = String(children).replace(/\n$/, "");

  // const handleCopyClick = async () => {
  //   try {
  //     await navigator.clipboard.writeText(codeString);
  //   } catch (err) {
  //     console.error("Failed to copy", err);
  //   }
  // };

  return (
    <>
      <SyntaxHighLighter
        {...props}
        language={language}
        children={codeString}
        style={dracula}
        customStyle={{ marginBottom: "0", borderRadius: "0" }}
      ></SyntaxHighLighter>

      {/* <button style={{ width: "100%" }} onClick={handleCopyClick}>
        btn={language}
      </button> */}
    </>
  );
};

export default function MarkdownRenderer({ content }: { content: string }) {
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
