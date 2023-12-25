"use client";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

export default function App() {
  const documents = useQuery(api.documents.get);

  return (
    <div>
      {documents?.map((document) => (
        <div key={document._id}>
          <Link href={`/${document._id}`}>{document.title}</Link>
        </div>
      ))}
    </div>
  );
}
