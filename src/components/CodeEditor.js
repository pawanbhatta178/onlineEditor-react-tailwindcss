import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import Compiler from "./Compiler";
const CodeEditor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  const valueGetter = useRef();
  const [code] = useState("//type your code...");

  const editorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const runCode = () => {
    setIsCodeRunning(true);
    console.log("running");
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <div className="w-1/2 h-full bg-gray-200 border-r">
      <Editor
        height="75vh"
        language="javascript"
        value={code}
        options={options}
        editorDidMount={editorDidMount}
      />
      <div className="flex bg-white justify-center items-center border-t">
        {!isCodeRunning ? (
          <button
            className="bg-transparent hover:bg-blue-900 text-blue-700 font-semibold hover:text-gray-200 py-2 px-10 my-8 border border-blue-500 hover:border-transparent rounded-lg"
            onClick={runCode}
            disabled={!isEditorReady && isCodeRunning}
          >
            Run Code
          </button>
        ) : (
          <Compiler
            code={valueGetter.current()}
            setIsCodeRunning={setIsCodeRunning}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;