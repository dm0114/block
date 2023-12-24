"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useMutation } from "convex/react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const create = useMutation(api.documents.create);

  const handleClickCreate = () => {
    const result = create({ title: "Untitled" });
  };

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
            <Link href="/document">리스트로</Link>
          </button>
        </>
      )}
      {/* <Editor onChange={() => {}} initalContent={""} /> */}
      <button onClick={handleClickCreate}>생성</button>
    </div>
  );
}
