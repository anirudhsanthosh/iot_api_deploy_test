declare module Config {
	type Environment = ENV & Default;

	interface Default {
		CLERK_SECRET_KEY: string;
		DATABASE: string;
		MONGO_DB_URL: string;
	}

	interface ENV {
		ENV: env;
		API_URL: string;
		CLERK_PUBLIC_KEY: string;
		CLERK_PUBLIC_CERTIFICATE: string;
	}

	type env = "development" | "production" | "beta";
}
