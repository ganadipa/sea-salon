"use server";

import { reservationFormSchema } from "@/lib/schemas";
import { TMutationResponse } from "./actions";
import { ReservationsTable } from "@/drizzle/schema";
import { sleep } from "@/lib/utils";

import { db } from "@/drizzle";

export async function addReservation(
  reservation: unknown
): Promise<TMutationResponse> {
  const validatedReservation = reservationFormSchema.safeParse(reservation);
  console.log(reservation);
  if (!validatedReservation.success) {
    return {
      ok: false,
      description: "Invalid review data",
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

  // revalidatePath("/app");

  return ret;
}
