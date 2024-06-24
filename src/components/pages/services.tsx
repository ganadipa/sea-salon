"use client";

import { cn } from "@/lib/utils";
import { EyeClosedIcon, HandIcon, ScissorsIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useState } from "react";

const ServicesData = [
  {
    icon: <ScissorsIcon width={36} height={36} />,
    name: "Haircuts and Styling",
    imageUrl: "https://i.ibb.co.com/PZyjCTL/haircut.jpg",
    description:
      "Discover the art of transformation with our exceptional haircuts and styling services. Whether you're looking for a classic trim, a bold new look, or elegant styling for a special occasion, our expert stylists are here to bring your vision to life. Using the latest techniques and premium products, we ensure every cut and style enhances your natural beauty and fits your unique personality. Step into our salon and experience a personalized approach to hair care that leaves you feeling confident and refreshed. Unleash your style potential with a haircut and styling session tailored just for you.",
  },
  {
    icon: <HandIcon width={36} height={36} />,
    name: "Menicure and Pedicure",
    imageUrl: "https://i.ibb.co.com/zsQsFnG/menicure.jpg",
    description:
      "Indulge in the ultimate pampering experience with our luxurious manicure and pedicure services. Our skilled technicians provide meticulous care, transforming your hands and feet into perfectly polished masterpieces. From classic manicures and pedicures to the latest trends in nail art, we use high-quality products to ensure lasting beauty and relaxation. Enjoy a soothing environment where you can unwind while we rejuvenate your nails and skin. Treat yourself to the elegance and sophistication of our manicure and pedicure services, and step out with confidence, showcasing hands and feet that are impeccably groomed and stunningly beautiful.",
  },
  {
    icon: <EyeClosedIcon width={36} height={36} />,
    name: "Facial Treatments",
    imageUrl: "https://i.ibb.co.com/nngCQQ8/facial.jpg",
    description:
      "Revitalize your skin with our luxurious facial treatments, designed to rejuvenate and refresh your complexion. Our skilled aestheticians tailor each facial to address your unique skin concerns, using premium products to cleanse, exfoliate, and hydrate. Whether you need deep cleansing, anti-aging solutions, or a soothing experience for sensitive skin, our treatments will leave your face glowing and radiant. Enjoy the relaxing ambiance of our salon as we restore your skin's natural beauty and vitality. Treat yourself to a transformative facial treatment and step out with a luminous, youthful glow.",
  },
];
type TService = (typeof ServicesData)[0];

export default function Services() {
  const [showingService, setShowingService] = useState<TService>(
    ServicesData[0]
  );

  return (
    <section className="min-h-screen flex flex-col items-center pb-24">
      {/* title */}
      <div className="my-12">
        <span className="text-5xl text-accent-green font-bold">
          Our Services
        </span>
      </div>

      {/* Button to show different services */}
      <div className="flex gap-4 items-center bg-accent-yellow/20 px-12 py-4">
        {ServicesData.map((service) => (
          <ServiceButton
            key={service.imageUrl}
            service={service}
            setShowingService={setShowingService}
            active={showingService === service}
          />
        ))}
      </div>

      {/* Current showing service */}
      <Service service={showingService} />
    </section>
  );
}

function Service({ service }: { service: TService }) {
  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div>
        <span className="font-semibold text-3xl w-full mt-4 block">
          {service.name}
        </span>
      </div>

      <div className="flex justify-around gap-8">
        <Image
          src={service.imageUrl}
          alt={service.name}
          width={300}
          height={300}
          className="w-[300px] h-[300px]"
        />
        <article className="max-w-[400px] max-h-[300px] text-justify">
          {service.description}
        </article>
      </div>
    </div>
  );
}

function ServiceButton({
  service,
  setShowingService,
  active,
}: {
  service: TService;
  setShowingService: React.Dispatch<React.SetStateAction<TService>>;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col px-4 py-2 items-center justify-center cursor-pointer w-32  gap-4 font-semibold aspect-square rounded bg-accent-yellow/40",
        { "bg-accent-yellow/90": active }
      )}
      onClick={() => {
        setShowingService(service);
      }}
    >
      {service.icon}
      <span className="text-xs">{service.name}</span>
    </div>
  );
}
