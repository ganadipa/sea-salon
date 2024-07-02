"use client";

import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-extra-middle text-white font-semibold rounded-md hover:bg-accent-green transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
