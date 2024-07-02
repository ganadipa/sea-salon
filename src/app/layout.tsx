import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import HeaderWrapper from "@/components/header-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Salon - Your best salon in town.",
  description: "Best salon in town.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white overflow-x-hidden h-screen overflow-y-hidden`}
      >
        <SessionProvider session={session}>
          <div className="max-w-[2000px] mx-auto">
            <HeaderWrapper />

            {children}
          </div>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
