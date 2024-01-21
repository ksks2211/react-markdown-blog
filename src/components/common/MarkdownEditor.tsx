import SimpleMdeReact from "react-simplemde-editor";
import { Options } from "easymde";

interface MarkdownEditorProps {
  value: string;
  onChange: () => void;
}

const options: Options = {
  spellChecker: true,
};

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return <SimpleMdeReact options={options} value={value} onChange={onChange} />;
}
