"use client";

import { actions } from "@/actions/actions";
import { TBranch, TService, TServices } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function Services({ services }: { services: TServices }) {
  const [showingService, setShowingService] = useState<TService | null>(
    services[0] ?? null
  );
  const [servicesBranches, setServicesBranches] = useState<
    {
      service: string | null;
      branch: string | null;
    }[]
  >([]);
  const [branches, setBranches] = useState<TBranch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      setServicesBranches(await actions.branch.getServicesBranches());
      setBranches(await actions.branch.getBranches());
    };

    fetchBranches();
  }, []);

  if (!services.length) {
    return (
      <section className="text-5xl mx-auto flex items-center justify-center my-16">
        {" "}
        Currently, Our salon has no service.
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center pb-24 text-zinc-200 bg-extra-middle">
      {/* title */}
      <div className="my-12">
        <span className="text-5xl font-bold">At our salon.</span>
      </div>

      {/* Button to show different services */}
      <div className="w-4/5 lg:w-[800px]  bg-accent-yellow/20 px-12 py-4">
        <div className="overflow-x-scroll flex gap-4 items-center h-24 text-black">
          {services.map((service) => (
            <ServiceButton
              key={service.name}
              service={service}
              setShowingService={setShowingService}
              active={showingService?.name === service.name}
            />
          ))}
        </div>
      </div>

      {/* Current showing service */}
      <Service
        service={showingService}
        relation={servicesBranches}
        branches={branches}
      />
    </section>
  );
}

function Service({
  service,
  relation,
  branches,
}: {
  service: TService | null;
  relation: {
    service: string | null;
    branch: string | null;
  }[];
  branches: TBranch[];
}) {
  if (!service) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full items-center gap-8 mt-8">
      <div>
        <span className="font-semibold text-3xl w-full mt-4">
          {service.name}
        </span>
      </div>
      is available at:
      {
        <div className="grid grid-cols-2 gap-4 px-4 lg:px-8 h-[400px] py-4 overflow-x-hidden overflow-y-scroll w-3/5">
          {relation
            .filter((r) => r.service === service.name)
            .map((r) => {
              const branch = branches.find((b) => b.name === r.branch);
              return (
                <div
                  key={r.branch}
                  className="h-[250px] flex flex-col gap-2 text-black bg-white lg:p-8 p-4 rounded-lg shadow-md justify-between"
                >
                  <span className="font-semibold">{branch?.name}</span>
                  <span>{branch?.location}</span>
                  <span>
                    {branch?.startTime}:00 - {branch?.endTime}:00
                  </span>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
}

function ServiceButton({
  service,
  setShowingService,
  active,
}: {
  service: TService;
  setShowingService: React.Dispatch<React.SetStateAction<TService | null>>;
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
