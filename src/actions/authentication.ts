"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { registerFormSchema } from "@/lib/schemas";
import { TMutationResponse } from "./actions";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";

export const register = async (
  values: z.infer<typeof registerFormSchema>
): Promise<TMutationResponse> => {
  const validatedValues = registerFormSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      ok: false,
      description: "Invalid input",
    };
  }

  const { email, password, name } = validatedValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return {
      ok: false,
      description: "User already exists",
    };
  }

  await db.insert(users).values({
    email,
    name,
  });

  return {
    ok: true,
    description: "User registered",
  };
};

export const signOutAction = async () => {
  await signOut();
  revalidatePath("/app", "layout");
};
