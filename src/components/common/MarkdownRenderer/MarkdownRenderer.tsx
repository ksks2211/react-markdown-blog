import ReactMarkdown from "react-markdown";
import type {
  CodeComponent,
  HeadingComponent,
} from "react-markdown/lib/ast-to-react";
import { PrismLight as SyntaxHighLighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import cn from "classnames";
import styles from "./MarkdownRenderer.module.scss";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";
import { uniqueId } from "lodash-es";

const CodeStyle = { marginBottom: "0", borderRadius: "0" };

const Code: CodeComponent = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");

  const language = match?.[1] || "text";
  const codeString = String(children).replace(/\n$/, "");

  if (language === "text") {
    return <code {...props} children={codeString} style={oneLight} />;
  }

  return (
    <SyntaxHighLighter
      {...props}
      language={language}
      children={codeString}
      style={oneLight}
      customStyle={CodeStyle}
    />
  );
};

//  auto inject random id to heading
const H1Component: HeadingComponent = ({ children, className, ...props }) => {
  const id = uniqueId();
  return (
    <h1 id={id} className={className} {...props}>
      {children}
    </h1>
  );
};

const H2Component: HeadingComponent = ({ children, className, ...props }) => {
  const id = uniqueId();
  return (
    <h2 id={id} className={className} {...props}>
      {children}
    </h2>
  );
};

const H3Component: HeadingComponent = ({ children, className, ...props }) => {
  const id = uniqueId();
  return (
    <h3 id={id} className={className} {...props}>
      {children}
    </h3>
  );
};

const reactMarkDownComponents = {
  code: Code,
  h1: H1Component,
  h2: H2Component,
  h3: H3Component,
};

export default function MarkdownRenderer({ content }: { content: string }) {
  useEffect(() => {
    import("github-markdown-css/github-markdown.css");
  }, []);

  return (
    <ReactMarkdown
      className={cn("markdown-body", styles.Markdown)}
      remarkPlugins={[remarkGfm]}
      components={reactMarkDownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
