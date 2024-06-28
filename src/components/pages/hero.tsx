import React from "react";
import { TextGenerateEffect } from "../ui/text-generate";
import { Button } from "../ui/button";
import Header from "../header";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-[90vh] min-h-screen bg-gradient-to-b to-extra-middle from-accent-green">
      <div className="flex flex-col items-center justify-around h-full">
        <header className="w-4/5 md:w-[800px] mt-8 bg-zinc-100/40 px-8 md:px-16 md:pt-8 md:pb-12 pt-4 pb-8 rounded">
          <TextGenerateEffect
            words="Beauty and Elegance Redefined, Be excited that we are now in your town."
            className="text-white"
          />
        </header>
        <Link href={"/app/dashboard"}>
          <Button>Book Now!</Button>
        </Link>
      </div>
    </section>
  );
}
