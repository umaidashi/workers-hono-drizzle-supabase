import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({
	path: ".dev.vars",
});

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		user: process.env.DATABASE_USER as string,
		host: process.env.DATABASE_HOST as string,
		database: process.env.DATABASE_NAME as string,
		password: process.env.DATABASE_PASSWORD as string,
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
