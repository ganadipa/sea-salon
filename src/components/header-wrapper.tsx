import { auth } from "@/auth";
import React from "react";
import Header from "./header";

export default async function HeaderWrapper() {
  const session = await auth();
  return <Header session={session} />;
}
