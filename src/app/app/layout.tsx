import { auth } from "@/auth";
import Header from "@/components/header";
import HeaderWrapper from "@/components/header-wrapper";
import NavBar from "@/components/navbar";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <main className="bg-white">{children}</main>;
}
