import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Client } from "../../services/db/service";
import { UserService } from "../user/service";
import { FarmService } from "./service";

export async function getFarms(request: Request, response: Response, next: NextFunction) {
	const farms = await new FarmService().getAll(request.user?._id!?.toString());

	response.json(farms ?? []);
}

export async function getAdminFarms(request: Request, response: Response, next: NextFunction) {
	try {
		const limit = parseInt(request.query.limit as string) || 100;

		const offset = parseInt(request.query.offset as string) || 0;

		const search = (request.query.search as string) || "";

		const fields = (request.query.fields as string) || ""; // comma-separated fields

		const sortBy = (request.query.sortBy as string) || "name";

		const sortOrder = (request.query.sortOrder as string)?.toLowerCase() === "desc" ? -1 : 1;

		const filters: Record<string, any> = {};

		// Search by farm name (case-insensitive)
		if (search) {
			filters.name = { $regex: search, $options: "i" };
		}

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

		// Query farms with filters, sorting, pagination, and projection
		const farms = await new FarmService().collection
			.find(filters, { ...(projection && { projection }) })
			.sort({ [sortBy]: sortOrder })
			.skip(offset)
			.limit(limit)
			.toArray();

		response.json(farms);
	} catch (error) {
		next(error);
	}
}

export async function farmAdminUpdate(request: Request, response: Response, next: NextFunction) {
	const farmId = request.params.farmId;
}

export async function getFarm(request: Request, response: Response, next: NextFunction) {
	const farmId = request.params.farmId;

	if (!farmId) throw new Error("Invalid farm Id");

	const farm = await new FarmService().get(farmId);

	if (!farm) throw new Error("Farm not found");

	const farmOwners = [farm.owner, ...(farm.shared_with ?? [])];

	if (!farmOwners.includes(request.user?._id!?.toString())) throw new Error("Farm not found");

	response.json(farm);
}

export async function createFarm(request: Request, response: Response, next: NextFunction) {
	if (!request.user?._id) throw new Error("User not found");

	const session = Client().startSession();

	session.startTransaction();

	const farm = await new FarmService().create(
		{
			name: request.body.name,
			owner: request.user?._id!?.toString(),
		},
		{ session },
	);

	console.log(request.user?._id);

	await new UserService().updateOne(
		{ _id: new ObjectId(request.user?._id!?.toString()) },
		{ $push: { farms: farm._id.toString() } },
		{ session },
	);

	await session.commitTransaction();

	response.json(farm);
}
