import { date, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const ReviewsTable = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  rating: integer("rating").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});
