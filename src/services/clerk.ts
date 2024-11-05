import { createClerkClient } from "@clerk/backend";
import { AppConfig } from "../config";

export const clerkClient = createClerkClient({
	jwtKey: AppConfig.CLERK_PUBLIC_CERTIFICATE,
	secretKey: AppConfig.CLERK_SECRET_KEY,
	publishableKey: AppConfig.CLERK_PUBLIC_KEY,
});
