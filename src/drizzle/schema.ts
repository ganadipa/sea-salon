import { services } from "@/lib/const";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const servicesEnum = pgEnum("service", services);

export const ReviewsTable = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const ReservationsTable = pgTable("reservations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  phonenumber: varchar("phonenumber", { length: 15 }).notNull(),
  service: servicesEnum("service").notNull(),
  datetime: timestamp("datetime", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
