import "dotenv/config";
import { ReviewsTable } from "./schema"; // Adjust this path to your actual schema fil
import { dummyReviews } from "@/lib/const";
import { db } from ".";
const seed = async () => {
  for (const review of dummyReviews) {
    await db
      .insert(ReviewsTable)
      .values({
        name: review.name,
        description: review.description,
        rating: review.rating,
        createdAt: new Date().toString(),
      })
      .execute();
  }

  console.log("Seeding completed");
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
});
