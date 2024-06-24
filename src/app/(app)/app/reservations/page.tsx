import { ReservationForm } from "@/components/reservation-form";

import React from "react";

export default function Page() {
  return (
    <main className="pt-16 min-h-screen bg-cyan-950 flex flex-col items-center gap-8">
      <h1 className="font-bold text-4xl text-zinc-200"> Reservation Form </h1>
      <ReservationForm />
    </main>
  );
}
