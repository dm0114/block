"use client";

import Editor from "./_components/editor";

export default function App() {
  // Renders the editor instance, and its contents as Markdown below.
  return (
    <div>
      <Editor onChange={() => {}} initalContent={""} />
    </div>
  );
}
