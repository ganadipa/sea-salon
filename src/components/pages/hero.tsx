import React from "react";
import { TextGenerateEffect } from "../ui/text-generate";
import { Button } from "../ui/button";
import Header from "../header";

export default function Hero() {
  return (
    <section className="h-[90vh] min-h-screen bg-gradient-to-br to-extra-middle from-accent-green">
      <Header />
      <div className="flex flex-col items-center justify-around h-full">
        <header className="md:w-[800px] mt-8 bg-zinc-100/40 px-16 pt-8 pb-12 rounded">
          <TextGenerateEffect
            words="Beauty and Elegance Redefined, Be excited that we are now in your town."
            className="text-white"
          />
        </header>
        <Button>Book Now!</Button>
      </div>
    </section>
  );
}
