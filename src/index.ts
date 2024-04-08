import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import postgres from "postgres";
import { post } from "./db/schema";

export type Env = {
	DATABASE_URL: string;
};

const app = new Hono<{
	Bindings: Env;
	Variables: { db: PostgresJsDatabase };
}>().basePath("/api");

app.all("*", async (c, next) => {
	const client = postgres(c.env.DATABASE_URL, {
		prepare: false,
	});
	const db = drizzle(client);

	c.set("db", db);
	await next();
});

app.get("/posts", async (c) => {
	const res = await c.var.db.select().from(post);

	return c.json(res);
});

showRoutes(app);
export default app;
