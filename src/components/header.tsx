"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    path: "/app",
  },
  {
    label: "Reservations",
    path: "/app/reservations",
  },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="flex justify-between items-center border-b w-full border-white/10 py-2 max-w-[780px] mx-auto bg-zinc-800/20 px-4 -translate-x-1/2 rounded-b fixed top-0 left-1/2">
      <Logo />

      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition font-semibold",
                  {
                    "bg-black/10 text-white": route.path === activePathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
