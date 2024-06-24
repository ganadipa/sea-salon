import { MoonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      className="flex items-center gap-4 cursor-pointer my-auto"
      href={"/app"}
    >
      <MoonIcon color="white" />
      <h1 className="font-bold  text-white/90">SEA Salon</h1>
    </Link>
  );
}
