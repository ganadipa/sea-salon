"use server";

import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getTheUser(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email));

  return user.length === 0 ? null : user[0];
}
