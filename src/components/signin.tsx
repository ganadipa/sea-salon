"use client";

import { signIn } from "next-auth/react";

export function SignInButton({ className }: { className?: string }) {
  return (
    <button onClick={() => signIn()} className={className}>
      Sign in
    </button>
  );
}
