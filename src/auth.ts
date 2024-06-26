import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "../auth.config";

import { accounts, sessions, users } from "./drizzle/schema";
import { db } from "./drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    sessionsTable: sessions,
    usersTable: users,
  }),
  session: { strategy: "jwt" },
  ...authConfig,
});
