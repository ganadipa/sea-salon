import "dotenv/config";
import { ReservationsTable, ReviewsTable } from "./schema"; // Adjust this path to your actual schema fil
import { dummyReviews } from "@/lib/const";
import { db } from ".";
const seed = async () => {
  // for (const review of dummyReviews) {
  //   await db
  //     .insert(ReviewsTable)
  //     .values({
  //       name: review.name,
  //       description: review.description,
  //       rating: review.rating,
  //       createdAt: new Date().toISOString(),
  //     })
  //     .execute();
  // }
  const ret = await db.select().from(ReviewsTable);
  console.log(
    ret.map(({ id, ...rest }) => ({
      ...rest,
      createdAt: new Date(rest.createdAt).toLocaleString(),
    }))
  );

  console.log("Seeding reviews completed");
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
});
