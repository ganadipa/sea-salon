import { auth } from "@/auth";
import AuthTabs from "@/components/auth-tabs";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/app/dashboard");
  }

  return (
    <main className="flex justify-center items-center min-h-screen overflow-x-hidden px-4">
      <AuthTabs />
    </main>
  );
}
