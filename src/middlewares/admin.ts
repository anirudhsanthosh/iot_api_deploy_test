import { NextFunction, Request, Response } from "express";

export function createAdminAuthGuardMiddleware() {
	return (request: Request, _: Response, next: NextFunction) => {
		const user = request.user;

		if (!user?.isAdmin) throw new Error("Unauthorized request");

		next();
	};
}
