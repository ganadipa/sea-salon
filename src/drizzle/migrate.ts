// src/migrate.ts

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from ".";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/drizzle/migrations" });
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
