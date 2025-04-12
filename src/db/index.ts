import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Define a type for our DB
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Create a proper DB instance if DATABASE_URL is set
let db: PostgresJsDatabase<typeof schema>;
if (process.env.DATABASE_URL) {
  const queryClient = postgres(process.env.DATABASE_URL);
  db = drizzle(queryClient, { schema });
} else {
  console.error("DATABASE_URL is not set");
  // We'll still throw an error at runtime, but TypeScript will be happy
  db = {} as PostgresJsDatabase<typeof schema>;
}

export default db;