"use client";
import { useConvexAuth, useQuery } from "convex/react";
import Link from "next/link";
import Editor from "@/app/_components/editor";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type DocumentDetailPageProps = {
  params: {
    id: Id<"documents">;
  };
};

const DocumentDetailPage = ({ params }: DocumentDetailPageProps) => {
  const { isAuthenticated } = useConvexAuth();
  const document = useQuery(api.documents.getById, { documentId: params.id });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      {isAuthenticated && <Link href={`/write/${document._id}`}>수정</Link>}
      <h1>Document Detail Page</h1>
      <Editor initalContent={document.content} editable={false} />
    </div>
  );
};

export default DocumentDetailPage;
