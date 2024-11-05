import { NextFunction, Request, Response } from "express";

export function createErrorHandlerMiddleware() {
	return async (err: any, request: Request, response: Response, next: NextFunction) => {
		try {
			console.error(err); // Log the error

			response.status(err.status || 500).json({
				status: err.status || 500,
				message: err.message || "Internal Server Error",
			});
		} catch (error) {
			console.error(error);

			response.status(500).json({ error });
		}
	};
}
