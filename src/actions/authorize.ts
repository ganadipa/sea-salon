"use server";

import { loginFormSchema } from "@/lib/schemas";
import { getTheUser } from "./user";
import bcrypt from "bcrypt";

export const authorize = async (
  credentials: Partial<Record<"email" | "password", unknown>>
) => {
  const { email, password } = credentials;
  console.log("checking if email and password are strings");
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }

  console.log("checking if email and password are valid");
  const theUser = await getTheUser(email);
  if (!theUser) {
    return null;
  }

  console.log("checking if password is valid");
  const match = await bcrypt.compare(password, theUser.password);
  if (!match) {
    return null;
  }

  console.log("returning the user");
  return theUser;
};
