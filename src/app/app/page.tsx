import { actions } from "@/actions/actions";
import ContactUs from "@/components/pages/contactus";
import Hero from "@/components/pages/hero";
import KindReview from "@/components/pages/kind-review";
import Services from "@/components/pages/services";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import Image from "next/image";
import React from "react";

export default async function Page() {
  const services = await actions.services.getServices();
  return (
    <main className="h-screen overflow-y-auto">
      <Hero />
      <Services services={services} />
      <ContactUs />
      <KindReview />
    </main>
  );
}
