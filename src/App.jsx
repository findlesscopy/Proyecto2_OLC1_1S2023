import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import Example from "./Navbar";
import { useState } from "react";


function App() {
  const [fileContent, setFileContent] = useState("");

  function handleFileUpload(content) {
    setFileContent(content);
  }

  function handleCreateNewFile() {
    setFileContent("");
  }

  function handleSaveFile() {
    const content = fileContent; // Obtener el contenido de fileContent
    const blob = new Blob([content], { type: "tw" });
    const a = document.createElement("a");
    a.download = "archivo.tw";
    a.href = window.URL.createObjectURL(blob);
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 0);
    };
    a.click();
  }

  function handleSaveButtonClick() {
    handleSaveFile(fileContent);
  }

  function handlePrintConsole() {
    console.log(fileContent);
  }



  return (
    <div className="h-screen bg-gray-800">
      <Example
        onCreateNewFile={handleCreateNewFile}
        onFileUpload={handleFileUpload}
        onSaveFile={handleSaveButtonClick}
        onPrintConsole={handlePrintConsole}
      />
      <div className="grid grid-cols-2 bg-gray-800 p-5 py-0 gap-5">
        <div className="inline-block py-3 px-2 text-sm text-gray-500 ">
          <h1>Codigo: </h1>
          <CodeMirror
            className="scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thin rounded-md"
            height="590px"
            value={fileContent}
            theme="dark"
            onChange={setFileContent}
          />
        </div>
        <div className="inline-block py-3 px-2 text-sm text-gray-500 ">
          <h1>Consola: </h1>
          <CodeMirror
            readOnly="true"
            className="scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thin rounded-md"
            height="590px"
            value=">"
            theme="dark"
          />
        </div>
      </div>
      
    </div>
  );
}
export default App;
