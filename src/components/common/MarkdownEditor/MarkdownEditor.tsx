import rehypeSanitize from "rehype-sanitize";
import { Suspense, lazy, useCallback } from "react";
import type { MDEditorProps } from "@uiw/react-md-editor";
import Loader from "../Loader";
import "./MarkdownEditor.scss";

// eslint-disable-next-line import/no-unresolved
const MDEditor = lazy(() => import("@uiw/react-md-editor/nohighlight"));
const MarkdownRenderer = lazy(() => import("../MarkdownRenderer"));

const PREVIEW_OPTIONS: MDEditorProps["previewOptions"] = {
  rehypePlugins: [[rehypeSanitize]],
};

const COMPONENTS_OPTIONS: MDEditorProps["components"] = {
  preview: (source) => {
    return (
      <Suspense fallback={<Loader />}>
        <MarkdownRenderer content={source} />
      </Suspense>
    );
  },
};

interface MarkdownEditorProps {
  value: string;
  onChange: (v: string) => void;
}
export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const handleChange = useCallback(
    (newValue: string | undefined) => {
      onChange(newValue || "");
    },
    [onChange]
  );

  return (
    <Suspense fallback={<Loader />}>
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        highlightEnable={false}
        previewOptions={PREVIEW_OPTIONS}
        components={COMPONENTS_OPTIONS}
        content={value}
      />
    </Suspense>
  );
}
