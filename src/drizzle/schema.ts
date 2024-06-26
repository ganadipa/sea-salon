import { initialServices } from "@/lib/const";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
  boolean,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const servicesEnum = pgEnum("service", initialServices);
export const roleEnum = pgEnum("role", ["admin", "customer"]);

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

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  phoneNumber: text("phoneNumber"),
  password: text("password"),
  role: roleEnum("role").default("customer"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
