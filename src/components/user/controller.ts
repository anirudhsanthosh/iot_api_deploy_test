import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./service";

export async function getUser(request: Request, response: Response, next: NextFunction) {
	const userService = new UserService();

	const auth = userService.parseUserFromRequest(request);

	const { isAdmin, ...user } = await userService.getOrCreateIfNotExists(auth);

	response.json(isAdmin ? { isAdmin, ...user } : user);
}

export const getAllUsersForAdmin: RequestHandler<{}> = async (request, response, next) => {
	const limit = parseInt(request.query.limit as string) || 100;

	const offset = parseInt(request.query.offset as string) || 0;

	const search = (request.query.search as string) || "";

	const fields = (request.query.fields as string) || ""; // comma-separated fields

	const sortBy = (request.query.sortBy as string) || "name";

	const sortOrder = (request.query.sortOrder as string)?.toLowerCase() === "desc" ? -1 : 1;

	const filters: Record<string, any> = {};

	if (search)
		filters.$or = [
			{ firstName: { $regex: search, $options: "i" } },
			{ lastName: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
		];

	// Exclude soft-deleted farms
	filters.deleted_at = { $eq: null };

	// Projection (fields to return)
	const projection = fields
		? fields.split(",").reduce(
				(acc, field) => {
					acc[field.trim()] = 1;
					return acc;
				},
				{} as Record<string, number>,
			)
		: {};

	const users = await new UserService().collection
		.find(filters, { ...(projection && { projection }) })
		.sort({ [sortBy]: sortOrder })
		.skip(offset)
		.limit(limit)
		.toArray();

	response.json(users);
};
