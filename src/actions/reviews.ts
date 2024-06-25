"use server";

import { reviewFormSchema } from "@/lib/schemas";
import { ReviewsTable } from "@/drizzle/schema";
import { TMutationResponse, TQueryResponse } from "./actions";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { TReviews } from "@/lib/types";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import { db } from "@/drizzle";

export async function addReview(review: unknown): Promise<TMutationResponse> {
  const validatedReview = reviewFormSchema.safeParse(review);
  if (!validatedReview.success) {
    return {
      ok: false,
      description: "Invalid review data",
    };
  }

  const data = validatedReview.data;

  let ret: TMutationResponse = {
    ok: false,
    description: "Something unexpected happened",
  };

  console.log(data);
  try {
    console.log(new Date().toString());
    await db.insert(ReviewsTable).values({
      name: data.name,
      description: data.description,
      rating: data.rating,
      createdAt: new Date().toISOString(),
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
    console.log("reviews are", reviews);
    const reviewsWithoutId = reviews.map(({ id, ...rest }) => ({
      ...rest,
      createdAt: new Date(rest.createdAt),
    }));
    ret = reviewsWithoutId;
    console.log("ret is", reviewsWithoutId);
  } catch (error) {
    ret = undefined;
  }

  revalidatePath("/app");

  return ret;
}
