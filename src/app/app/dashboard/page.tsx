import { actions } from "@/actions/actions";
import { auth, signIn } from "@/auth";
import AdminTabs from "@/components/admin-tabs";
import { NewBranch } from "@/components/new-branch-form";
import { NewService } from "@/components/new-service-form";
import { ReservationForm } from "@/components/reservation-form";
import ReservationsTable from "@/components/reservation-table";
import { ReservationsDatabaseColumn } from "@/lib/types";
import { sleep } from "@/lib/utils";
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
    <main className="pt-16 min-h-screen lg:bg-cyan-950 flex flex-col items-center gap-8 px-2">
      <section className="lg:w-[80%] w-full lg:px-12 max-lg:mx-2 py-8 rounded-xl bg-white text-zinc-600 flex flex-col gap-8 border items-center">
        <h1 className="font-bold text-xl lg:text-4xl lg:text-cyan-950/50 text-zinc-800 ">
          {" "}
          Your Future Schedule{" "}
        </h1>
        <ReservationsTable reservations={schedules} future />
      </section>

      <h1 className="font-bold text-lg lg:text-4xl text-zinc-600 lg:text-zinc-200">
        {" "}
        Reservation Form{" "}
      </h1>
      <ReservationForm services={services} />
    </main>
  );
}

function AdminPage({ schedules }: { schedules: ReservationsDatabaseColumn[] }) {
  return (
    <main className="pt-16 min-h-screen bg-cyan-950 flex flex-col items-center gap-8">
      <section className="flex flex-row max-lg:flex-row gap-8 items-center justify-around bg-zinc-200/70 py-4 lg:py-8 lg:px-12 ">
        <AdminTabs />
      </section>

      <section className="w-full lg:w-[80%] lg:px-12 py-8 lg:rounded-xl bg-white text-zinc-600 flex flex-col gap-8 items-center lg:mt-12 mt-4 px-2 mb-4">
        <h1 className="font-bold text-4xl text-cyan-950/50 ">
          {" "}
          Your Future Schedule{" "}
        </h1>
        <ReservationsTable reservations={schedules} future />
      </section>
    </main>
  );
}
