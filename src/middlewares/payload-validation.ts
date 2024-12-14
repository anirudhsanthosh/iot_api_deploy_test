import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validatePayload(schema: Schema, source: "body" | "query" | "params" = "body") {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req[source], { abortEarly: false });

		if (!error) return next();

		res.status(422).json({
			status: "error",
			message: "Invalid request payload",
			details: error.details.map((err) => ({
				message: err.message,
				path: err.path,
			})),
		});
	};
}
