import { actions } from "@/actions/actions";
import ContactUs from "@/components/pages/contactus";
import Hero from "@/components/pages/hero";
import KindReview from "@/components/pages/kind-review";
import Services from "@/components/pages/services";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "SEA Salon - Your best salon in town.",
  description: "Best salon in town.",
};

export default async function Page() {
  const services = await actions.services.getServices();
  return (
    <main className="">
      <Hero />
      <Services services={services} />
      <ContactUs />
      <KindReview />
    </main>
  );
}
