import { actions } from "@/actions/actions";
import { auth, signIn } from "@/auth";
import { NewService } from "@/components/new-service-form";
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
  const email = session.user.email ? session.user.email : undefined;
  const schedules = await actions.reservations.getAllReservations(
    session.user.role === "admin" ? undefined : email
  );

  return session.user.role === "customer" ? (
    <CustomerPage schedules={schedules} />
  ) : (
    <AdminPage schedules={schedules} />
  );
}

async function CustomerPage({
  schedules,
}: {
  schedules: ReservationsDatabaseColumn[];
}) {
  const services = await actions.services.getServices();

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
      <ReservationForm services={services} />
    </main>
  );
}

function AdminPage({ schedules }: { schedules: ReservationsDatabaseColumn[] }) {
  return (
    <main className="pt-16 min-h-screen bg-cyan-950 flex flex-col items-center gap-8">
      <h1 className="font-bold text-4xl text-zinc-200"> Add New Service </h1>
      <NewService />

      <section className="w-[80%] px-12 py-8 rounded-xl bg-white text-zinc-600 flex flex-col gap-8 items-center mt-12">
        <h1 className="font-bold text-4xl text-cyan-950/50 ">
          {" "}
          Your Future Schedule{" "}
        </h1>
        <ReservationsTable reservations={schedules} future />
      </section>
    </main>
  );
}
