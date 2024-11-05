import { subDays } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { NodeDataService } from "../../services";

const ISO_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

export async function getAnalytics(request: Request, response: Response, next: NextFunction) {
	const deviceId = request.params.deviceId;

	if (!deviceId) throw new Error("Invalid device id");

	const from = ISO_REGEX.test((request.query.from ?? "") as string)
		? new Date(request.query.from as string)
		: subDays(new Date(), 30);

	console.log({ from: request.query.from, to: request.query.to });

	const to = ISO_REGEX.test((request.query.to ?? "") as string) ? new Date(request.query.to as string) : new Date();

	console.log({ from, deviceId, to });

	const analytics = await new NodeDataService().getDataByInterval(from, to, deviceId);

	response.json(analytics);
}
