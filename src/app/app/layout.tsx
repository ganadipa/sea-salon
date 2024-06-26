import { auth } from "@/auth";
import Header from "@/components/header";
import NavBar from "@/components/navbar";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("session in layout", session);
  return (
    <main className="bg-white">
      <Header />
      {children}
    </main>
  );
}
