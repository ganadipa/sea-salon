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
    return new Error("Invalid input");
  }

  console.log("checking if email and password are valid");
  const theUser = await getTheUser(email);
  if (!theUser) {
    return new Error("User not found");
  }

  console.log("checking if password is valid");
  const pwHash = await bcrypt.hash(password, 10);
  const match = await bcrypt.compare(password, pwHash);
  if (!match) {
    return new Error("Invalid password");
  }

  console.log("returning the user");
  return theUser;
};
