import * as dotenv from "dotenv";
import { BetaConfig } from "./envs/beta.js";
import { DevelopmentConfig } from "./envs/development.js";
import { ProductionConfig } from "./envs/production.js";
dotenv.config();

function createConfig() {
	const env = process.env.NODE_ENV as Config.env;

	switch (env) {
		case "development":
			return DevelopmentConfig;

		case "beta":
			return BetaConfig;

		case "production":
			return ProductionConfig;

		default:
			throw new Error(`Invalid environment specified ==> ${env}`);
	}
}

export const AppConfig = createConfig();
