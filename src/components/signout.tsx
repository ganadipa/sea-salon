"use client";

import toast from "react-hot-toast";
import { actions } from "@/actions/actions";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export function SignOut({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        const toastId = toast.loading("Signing out...");
        await actions.auth.signOutAction();
        toast.success("Signed out", { id: toastId });

        router.replace("/app");
        router.refresh();
      }}
      className={className}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
