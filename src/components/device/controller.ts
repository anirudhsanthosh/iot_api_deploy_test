import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Client } from "../../services/db/service";
import { FarmService } from "../farms/service";
import { DeviceService } from "./service";

export async function getDevices(request: Request, response: Response, next: NextFunction) {
	const farmId = request.params.farmId;

	if (!farmId) throw new Error("Farm not found");

	const devices = await new DeviceService().getAll(farmId);

	response.json(devices ?? []);
}

export async function getDevicesByAdmin(request: Request, response: Response, next: NextFunction) {
	const devices = await new DeviceService().collection.find({}).toArray();

	response.json(devices ?? []);
}

export async function deviceAdminUpdate(request: Request, response: Response, next: NextFunction) {
	const deviceId = request.params.deviceId;

	if (!deviceId) throw new Error("Device not found");

	const existingDevice = await new DeviceService().collection.findOne({ _id: new ObjectId(deviceId) });

	await new DeviceService().collection.updateOne(
		{ _id: new ObjectId(deviceId) },
		{
			$set: request.body,
		},
	);

	if (request.body.farm_id)
		await new FarmService().updateOne(
			{ _id: new ObjectId(request.body.farm_id as string) },
			{ $addToSet: { devices: deviceId } },
		);

	console.log(existingDevice?.farm_id);

	if (existingDevice?.farm_id)
		await new FarmService().updateOne(
			{ _id: new ObjectId(existingDevice?.farm_id as string) },
			{ $pull: { devices: deviceId } },
		);

	response.send();
}

export async function getDevice(request: Request, response: Response, next: NextFunction) {
	const farmId = request.params.farmId;

	const deviceId = request.params.deviceId;

	if (!farmId) throw new Error("Farm not found");

	if (!deviceId) throw new Error("Device not found");

	const device = await new DeviceService().get(deviceId);

	if (!device) throw new Error("Farm not found");

	response.json(device);
}

export async function createDevice(request: Request, response: Response, next: NextFunction) {
	const farmId = request.body.farm_id as string | undefined;

	const session = Client().startSession();

	try {
		session.startTransaction();

		const device = await new DeviceService().create(request.body, { session });

		if (farmId)
			await new FarmService().updateOne(
				{ _id: new ObjectId(farmId) },
				{ $push: { devices: device._id.toString() } },
				{ session },
			);

		await session.commitTransaction();

		response.json(device);
	} catch (err) {
		throw err;
	}
}

export async function analytics(request: Request, response: Response, next: NextFunction) {
	const farmId = request.params.farmId;

	if (!farmId) throw new Error("Farm not found");

	const deviceId = request.params.deviceId;

	if (!deviceId) throw new Error("Device not found");

	const { start, end } = request.query.interval as { start: string; end: string };
}
