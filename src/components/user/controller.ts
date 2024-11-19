import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./service";

export async function getUser(request: Request, response: Response, next: NextFunction) {
	const userService = new UserService();

	const auth = userService.parseUserFromRequest(request);

	const { isAdmin, ...user } = await userService.getOrCreateIfNotExists(auth);

	response.json(isAdmin ? { isAdmin, ...user } : user);
}

export const getAllUsersForAdmin: RequestHandler<{}> = async (request, response, next) => {
	const userService = new UserService();

	const users = await userService.collection.find({}).toArray();

	response.json(users);
};
