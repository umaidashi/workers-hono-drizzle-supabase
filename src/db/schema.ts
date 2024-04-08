import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const post = pgTable("posts", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 256 }).notNull(),
	description: text("description"),
	content: text("content"),
});

export type Post = InferSelectModel<typeof post>;
