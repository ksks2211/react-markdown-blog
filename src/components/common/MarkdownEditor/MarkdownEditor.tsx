import MDEditor from "@uiw/react-md-editor";
import MarkdownRenderer from "../MarkdownRenderer";
import rehypeSanitize from "rehype-sanitize";
import "./MarkdownEditor.scss";

interface MarkdownEditorProps {
  value: string;
  onChange: (v: string) => void;
}
export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <MDEditor
      value={value}
      onChange={(newValue) => onChange(newValue || "")}
      preview="edit"
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      components={{
        preview: (source) => {
          //   const {preview} = state;

          //   dispatch({ preview: preview === "edit" ? "preview" : "edit"
          // })

          return (<MarkdownRenderer content={source} />) as JSX.Element;
        },
      }}
      // commands={customCommands}

      content={value}
    />
  );
}
