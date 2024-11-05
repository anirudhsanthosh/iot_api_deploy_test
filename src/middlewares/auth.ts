import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import * as dotenv from "dotenv";
import { AppConfig } from "../config";
dotenv.config();

export function createAuthMiddleware() {
	return ClerkExpressRequireAuth({ jwtKey: AppConfig.CLERK_PUBLIC_CERTIFICATE });
}
