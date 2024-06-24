"use server";

import { reviewFormSchema } from "@/lib/schemas";
import { db } from "@/drizzle";
import { ReviewsTable } from "@/drizzle/schema";
import { TMutationnResponse, TQueryResponse } from "./actions";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { TReviews } from "@/lib/types";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

export async function addReview(review: unknown): Promise<TMutationnResponse> {
  const validatedReview = reviewFormSchema.safeParse(review);
  console.log(review);
  if (!validatedReview.success) {
    return {
      ok: false,
      description: "Invalid review data",
    };
  }

  const data = validatedReview.data;

  // Server side validation
  if (data.rating < 1 || data.rating > 5) {
    return {
      ok: false,
      description: "Rating should be between 1 and 5",
    };
  }

  if (data.name.length < 2) {
    return {
      ok: false,
      description: "Name should be at least 2 characters",
    };
  }

  if (data.description.length < 5) {
    return {
      ok: false,
      description: "Description should be at least 5 characters",
    };
  }

  let ret: TMutationnResponse = {
    ok: false,
    description: "Something unexpected happened",
  };

  console.log(data);
  try {
    await db.insert(ReviewsTable).values({
      name: data.name,
      description: data.description,
      rating: data.rating,
      createdAt: new Date().toString(),
    });

    ret = {
      ok: true,
      description: "Review added successfully",
    };
  } catch (error) {
    ret = {
      ok: false,
      description: "Error adding review",
    };
  }

  await sleep(1000);
  revalidatePath("/app");

  return ret;
}

export async function getReviews(): Promise<
  TQueryResponse<TReviews | undefined>
> {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  let ret = undefined;

  try {
    const reviews = await db.select().from(ReviewsTable);
    const reviewsWithoutId = reviews.map(({ id, ...rest }) => ({
      ...rest,
      createdAt: new Date(rest.createdAt),
    }));
    ret = reviewsWithoutId;
  } catch (error) {
    ret = undefined;
  }

  revalidatePath("/app");

  return ret;
}
