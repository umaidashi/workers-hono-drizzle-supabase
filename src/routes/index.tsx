import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Hono } from "hono";
import { Env } from "hono";
import { Post, post } from "../db/schema";

export const posts = new Hono<{
	Bindings: Env;
	Variables: { db: PostgresJsDatabase };
}>();

const Posts = (props: { posts: Post[] }) => {
	return (
		<div>
			{props.posts.map((post) => (
				<div key={post.id}>
					<h2>{post.title}</h2>
					<p>{post.description}</p>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
};

posts.get("/", async (c) => {
	const data = await c.var.db.select().from(post);

	return c.html(<Posts posts={data} />);
});
