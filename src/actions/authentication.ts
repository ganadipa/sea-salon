"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { registerFormSchema } from "@/lib/schemas";
import { TMutationResponse } from "./actions";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/dist/server/api-utils";

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

  const { email, phonenumber, password, name } = validatedValues.data;
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
    phoneNumber: phonenumber,
    password: hashedPassword,
  });

  return {
    ok: true,
    description: "User registered",
  };
};

export const signOutAction = async () => {
  await signOut();
  revalidatePath("/app", "layout");
  revalidatePath("/");
};

export const signInAction: (
  formData: FormData
) => Promise<{ ok: boolean; description: string }> = async (
  formData: FormData
) => {
  let res = {
    ok: false,
    description: "Something unexpected happened",
  };

  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    res = {
      ok: true,
      description: "Signed in successfully",
    };
  } catch (error) {
    res = {
      ok: false,
      description: "Invalid credentials",
    };
  } finally {
    await sleep(1000);
    revalidatePath("/app", "layout");
    return res;
  }
};
