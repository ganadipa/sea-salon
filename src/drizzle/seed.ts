import "dotenv/config";
import { ReservationsTable, ReviewsTable, users } from "./schema"; // Adjust this path to your actual schema fil
import { dummyReviews, dummyUsers } from "@/lib/const";
import { db } from ".";
const seed = async () => {
  // const ret = await db.select().from(ReviewsTable);
  // console.log(
  //   ret.map(({ id, ...rest }) => ({
  //     ...rest,
  //     createdAt: new Date(rest.createdAt).toLocaleString(),
  //   }))
  // );
  await seedReviews();
  await seedUsers();

  console.log("Seeding completed");
};

const seedReviews = async () => {
  for (const review of dummyReviews) {
    await db
      .insert(ReviewsTable)
      .values({
        name: review.name,
        description: review.description,
        rating: review.rating,
        createdAt: new Date().toISOString(),
      })
      .execute();
  }
};

const seedUsers = async () => {
  for (const user of dummyUsers) {
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phonenumber,
    });
  }
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
});
