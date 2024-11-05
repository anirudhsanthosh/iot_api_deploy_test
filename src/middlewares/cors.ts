import cors from "cors";
import { Request } from "express";

const corsConfig = (request: Request, callback: (...params: any) => void) => {
	const origin = request.headers.origin ?? "http://localhost:5173"; //TODO add origins and make it secure

	let options = { origin, credentials: true };

	callback(null, options);
};

export function createCorsMiddleware() {
	return cors(corsConfig);
}
