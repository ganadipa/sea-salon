import Header from "@/components/header";
import NavBar from "@/components/navbar";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white">
      <Header />
      {children}
    </main>
  );
}
