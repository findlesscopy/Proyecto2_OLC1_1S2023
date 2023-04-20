import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

function CodeEditor() {
  const [content, setContent] = useState('');

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  return (
    <CodeMirror
      className="scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thin rounded-md"
      height="590px"
      value={content}
      theme="dark"
      onChange={handleContentChange}
    />
  );
}

export default CodeEditor;
