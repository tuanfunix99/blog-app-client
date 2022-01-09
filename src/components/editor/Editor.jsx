import React, { Fragment, useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./constants";
import { useState } from "react";

const Editor = () => {
  const instanceRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      setEditor(
        new EditorJS({
          holder: "editorjs",
          tools: EDITOR_JS_TOOLS,
          data: {
            blocks: [
              {
                type: "header",
                data: {
                  text: "Tell your story...",
                  level: 5,
                },
              },
            ],
          },
          version: "2.22.2",
        })
      );
    }
  }, [editor]);

  return (
    <Fragment>
      <div id="editorjs"></div>
    </Fragment>
  );
};

export default Editor;
