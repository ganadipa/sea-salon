import "dotenv/config";
import {
  ReservationsTable,
  ReviewsTable,
  servicesTable,
  users,
} from "./schema"; // Adjust this path to your actual schema fil
import { ServicesData, dummyReviews, dummyUsers } from "@/lib/const";
import bcrypt from "bcrypt";
import { db } from ".";
const seed = async () => {
  // const ret = await db.select().from(ReviewsTable);
  //   ret.map(({ id, ...rest }) => ({
  //     ...rest,
  //     createdAt: new Date(rest.createdAt).toLocaleString(),
  //   }))
  // );
  // await seedReviews();
  // await seedUsers();
  await seedServices();
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
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      phoneNumber: user.phonenumber,
    });
  }
};

const seedServices = async () => {
  for (const service of ServicesData) {
    await db
      .insert(servicesTable)
      .values({
        name: service.name,
        duration: service.duration,
        description: service.description,
        imageUrl: service.imageUrl,
      })
      .execute();
  }
};

seed().catch((error) => {
  console.error("Error seeding data:", error);
});
