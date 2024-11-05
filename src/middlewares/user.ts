import { NextFunction, Request, Response } from "express";
import { DB } from "../services/db/service";

export function createUserInjectionMiddleware() {
	return async (request: Request, _: Response, next: NextFunction) => {
		const { auth } = request;

		// console.log(auth);

		if (!auth) throw new Error("Unauthorized request");

		const collection = DB().collection<Users.user>("users");

		const user = await collection.findOne({ email: auth?.sessionClaims?.email });

		if (!user) throw new Error("Unauthorized request, user not found.");

		request.user = user;

		next();
	};
}
