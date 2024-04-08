import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

config({
	path: ".dev.vars",
});

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "drizzle",
		});
		console.log(process.env.DATABASE_URL);
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

main();
