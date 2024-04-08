import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

config({
	path: ".dev.vars",
});

const pool = postgres(process.env.DATABASE_URL as string, {
	ssl: { rejectUnauthorized: false },
	prepare: false,
});

const db = drizzle(pool);

export { db, pool, schema };
