"use client";

import toast from "react-hot-toast";
import { actions } from "@/actions/actions";

import { useRouter } from "next/navigation";

export function SignOut({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        await actions.auth.signOutAction();
        router.replace("/app");
        router.refresh();
      }}
      className={className}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
