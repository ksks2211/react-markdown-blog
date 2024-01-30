import rehypeSanitize from "rehype-sanitize";
import { Suspense, lazy } from "react";
import Loader from "../Loader";
import "./MarkdownEditor.scss";

// eslint-disable-next-line import/no-unresolved
const MDEditor = lazy(() => import("@uiw/react-md-editor/nohighlight"));
const MarkdownRenderer = lazy(() => import("../MarkdownRenderer"));

interface MarkdownEditorProps {
  value: string;
  onChange: (v: string) => void;
}
export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <Suspense fallback={<Loader />}>
      <MDEditor
        value={value}
        onChange={(newValue) => onChange(newValue || "")}
        preview="edit"
        highlightEnable={false}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        components={{
          preview: (source) => {
            return (
              <Suspense fallback={<Loader />}>
                <MarkdownRenderer content={source} />
              </Suspense>
            );
          },
        }}
        content={value}
      />
    </Suspense>
  );
}
