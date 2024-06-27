"use server";

import { reservationFormSchema } from "@/lib/schemas";
import { TMutationResponse } from "./actions";
import { ReservationsTable } from "@/drizzle/schema";
import { sleep } from "@/lib/utils";

import { db } from "@/drizzle";
import { z } from "zod";
import { auth } from "@/auth";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addReservation(
  reservation: unknown
): Promise<TMutationResponse> {
  const validatedReservation = reservationFormSchema.safeParse(reservation);
  if (!validatedReservation.success) {
    return {
      ok: false,
      description: "Invalid review data",
    };
  }
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      description: "You need to be logged in to book a reservation",
    };
  }

  const data = validatedReservation.data;

  let ret: TMutationResponse = {
    ok: false,
    description: "Something unexpected happened",
  };

  const bookdate = new Date(data.date);
  bookdate.setHours(data.startTime, 0, 0, 0);
  try {
    await db.insert(ReservationsTable).values({
      name: data.name,
      phonenumber: data.phonenumber,
      service: data.service,
      createdAt: new Date().toISOString(),
      datetime: bookdate.toISOString(),
      email: session!.user.email,
    });

    ret = {
      ok: true,
      description: "Successfully book the reservation",
    };
  } catch (error) {
    console.log(error);
    ret = {
      ok: false,
      description: "Error adding review",
    };
  }

  await sleep(1000);

  revalidatePath("/app/dashboard", "page");

  return ret;
}

export async function getAllReservations(email?: string) {
  const reservations = await db
    .select()
    .from(ReservationsTable)
    .where(email ? eq(ReservationsTable.email, email) : undefined)
    .orderBy(desc(ReservationsTable.datetime));

  revalidatePath("/app/dashboard", "page");

  return reservations;
}
