"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [markdown, setMarkdown] = useState<string>("");

  const editor: BlockNoteEditor = useBlockNote({
    // Listens for when the editor's contents change.
    onEditorContentChange: (editor) => {
      // Converts the editor's contents from Block objects to Markdown and
      // saves them.
      const saveBlocksAsMarkdown = async () => {
        const markdown: string = await editor.blocksToMarkdown(
          editor.topLevelBlocks
        );
        setMarkdown(markdown);
      };
      saveBlocksAsMarkdown();
    },
  });

  return (
    <div>
      <button onClick={() => console.log(editor)}>click</button>
      <BlockNoteView editor={editor} theme={"dark"} />
      <pre>{markdown}</pre>
    </div>
  );
}
