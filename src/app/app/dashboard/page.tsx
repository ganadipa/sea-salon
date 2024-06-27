import { actions } from "@/actions/actions";
import { auth, signIn } from "@/auth";
import { ReservationForm } from "@/components/reservation-form";
import ReservationsTable from "@/components/reservation-table";
import { ReservationsDatabaseColumn } from "@/lib/types";
import { redirect } from "next/navigation";

import React from "react";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/app/dashboard");
  }

  const schedules = await actions.reservations.getAllReservations(
    session.user.email ? session.user.email : undefined
  );

  return session.user.role === "customer" ? (
    <CustomerPage schedules={schedules} />
  ) : (
    <>admin</>
  );
}

function CustomerPage({
  schedules,
}: {
  schedules: ReservationsDatabaseColumn[];
}) {
  return (
    <main className="pt-16 min-h-screen bg-cyan-950 flex flex-col items-center gap-8">
      <section className="w-[80%] px-12 py-8 rounded-xl bg-white text-zinc-600 flex flex-col gap-8 items-center">
        <h1 className="font-bold text-4xl text-cyan-950/50 ">
          {" "}
          Your Future Schedule{" "}
        </h1>
        <ReservationsTable reservations={schedules} future />
      </section>

      <h1 className="font-bold text-4xl text-zinc-200"> Reservation Form </h1>
      <ReservationForm />
    </main>
  );
}
