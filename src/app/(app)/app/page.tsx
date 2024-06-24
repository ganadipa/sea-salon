import ContactUs from "@/components/pages/contactus";
import Hero from "@/components/pages/hero";
import KindReview from "@/components/pages/kind-review";
import Services from "@/components/pages/services";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <ContactUs />
      <KindReview />
    </main>
  );
}
