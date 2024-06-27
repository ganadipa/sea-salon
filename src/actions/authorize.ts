"use server";

import { loginFormSchema } from "@/lib/schemas";
import { getTheUser } from "./user";
import bcrypt from "bcrypt";

export const authorize = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  const { email, password } = credentials;
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }

  const theUser = await getTheUser(email);
  if (!theUser) {
    return null;
  }

  const match = await bcrypt.compare(password, theUser.password);
  if (!match) {
    return null;
  }

  return theUser;
};
