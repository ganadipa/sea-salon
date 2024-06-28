"use client";

import { ServicesData } from "@/lib/const";
import { TService, TServices } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, HandIcon, ScissorsIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useState } from "react";

export default function Services({ services }: { services: TServices }) {
  const [showingService, setShowingService] = useState<TService>(services[0]);

  return (
    <section className="min-h-screen flex flex-col items-center pb-24">
      {/* title */}
      <div className="my-12">
        <span className="text-5xl font-bold">At our salon.</span>
      </div>

      {/* Button to show different services */}
      <div className=" w-4/5 lg:w-[800px]  bg-accent-yellow/20 px-12 py-4">
        <div className="overflow-x-scroll flex gap-4 items-center h-24">
          {services.map((service) => (
            <ServiceButton
              key={service.name}
              service={service}
              setShowingService={setShowingService}
              active={showingService === service}
            />
          ))}
        </div>
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

      <div className="flex flex-col lg:flex-row justify-around items-center mx-8 gap-8">
        <Image
          src={service.imageUrl || "https://i.ibb.co.com/YbzR2BF/sea-salon.jpg"}
          alt={service.name}
          width={300}
          height={300}
          className="w-[300px] h-[300px] rounded-xl border border-yellow-400"
        />

        <article className="max-w-[400px] h-[300px] text-justify opacity-60 overflow-x-hidden overflow-y-scroll">
          <div className="mb-8 font-bold">
            {service.imageUrl
              ? ""
              : "Image shown above is only a placeholder, because we do not have the image for this service."}
          </div>
          {service.description || "No description available."}
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
        "flex flex-col px-4 py-2 items-center justify-center cursor-pointer min-w-48 lg:w-32 font-semibold h-full rounded bg-accent-yellow/40",
        { "bg-accent-yellow/90": active }
      )}
      onClick={() => {
        setShowingService(service);
      }}
    >
      <span className="text-xs">{service.name}</span>
    </div>
  );
}
