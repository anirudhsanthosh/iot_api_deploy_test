import { NextFunction, Request, Response } from "express";
import { UserService } from "./service";

export async function getUser(request: Request, response: Response, next: NextFunction) {
	const service = new UserService();

	const auth = service.parseUserFromRequest(request);

	const { isAdmin, ...user } = await service.getOrCreateIfNotExists(auth);

	response.json(isAdmin ? { isAdmin, ...user } : user);
}
