"use client";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initalContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initalContent, editable }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote({
    editable: editable,
    initialContent: initalContent
      ? (JSON.parse(initalContent) as PartialBlock[])
      : undefined,

    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return <BlockNoteView editor={editor} theme={"dark"} />;
};
export default Editor;
