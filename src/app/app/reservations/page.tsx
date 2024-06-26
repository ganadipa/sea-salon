import { auth, signIn } from "@/auth";
import { ReservationForm } from "@/components/reservation-form";
import { redirect } from "next/navigation";

import React from "react";

export default async function Page() {
  const session = await auth();
  console.log("session is", session);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/app/reservations");
  }

  return (
    <main className="pt-16 min-h-screen bg-cyan-950 flex flex-col items-center gap-8">
      <h1 className="font-bold text-4xl text-zinc-200"> Reservation Form </h1>
      <ReservationForm />
    </main>
  );
}
