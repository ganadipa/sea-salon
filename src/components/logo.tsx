import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      className="flex items-center gap-4 cursor-pointer my-auto"
      href={"/app"}
    >
      <div
        className="w-8 aspect-square bg-green-500 rounded-full"
        content=""
      ></div>
      <h1 className="font-bold  text-white/90">SEA SALON</h1>
    </Link>
  );
}
