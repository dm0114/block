"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import Link from "next/link";
import Editor from "@/app/_components/editor";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

type WritePageProps = {
  params: {
    id: Id<"documents">;
  };
};

const WritePage = ({ params }: WritePageProps) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const document = useQuery(api.documents.getById, { documentId: params.id });
  const create = useMutation(api.documents.create);
  const update = useMutation(api.documents.update);

  const handleClickCreate = () => {
    const result = create({ title: "Untitled" });
  };

  const handleClickUpdate = (content: string) => {
    update({ id: params.id, content });
  };

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <UserButton afterSignOutUrl="/ " />
          <button>
            <Link href="/">리스트로</Link>
          </button>
        </>
      )}
      <Editor onChange={handleClickUpdate} initialContent={document.content} />
      <button onClick={handleClickCreate}>create</button>
    </div>
  );
};

export default WritePage;
