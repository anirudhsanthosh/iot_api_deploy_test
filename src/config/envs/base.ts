import * as dotenv from "dotenv";
dotenv.config();

const config: Config.Default = {
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
	MONGO_DB_URL: process.env.MONGODB_CONNECTION_STRING!,
	DATABASE: process.env.DATABASE!,
};

export const DefaultConfig = Object.freeze(config);
