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
	const farms = await new FarmService().collection.find({}).toArray();

	console.log({ farms });

	response.json(farms ?? []);
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
