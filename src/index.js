import React, { useState } from "react";
import ReactDOM from "react-dom";
import FilePicker from "./FilePicker";
import MIMETypes from "./MIMETypes";

import "./styles.css";

const acceptedFiles = MIMETypes.map(e => e.type);

function App() {
  const [fileObject, setFile] = useState({ file: "", fileBase64: "" });
  const { file, fileBase64 } = fileObject;

  console.log(acceptedFiles);

  const handleDrop = (file, fileBase64) => {
    setFile({ file, fileBase64 });
  };

  return (
    <div className="App">
      <FilePicker
        accept={acceptedFiles}
        file={file}
        fileBase64={fileBase64}
        onDrop={handleDrop}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
