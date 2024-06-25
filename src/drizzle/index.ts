import { neon } from "@neondatabase/serverless";
import { NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env" });

let dbInstance: NeonHttpDatabase<Record<string, never>> | undefined;
const getDbInstance = () => {
  if (!dbInstance) {
    dbInstance = drizzle(neon(process.env.DATABASE_URL!));
  }
  return dbInstance;
};

export const db = getDbInstance();
