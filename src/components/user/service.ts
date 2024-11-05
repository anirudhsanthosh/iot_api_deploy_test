import { Request } from "express";
import { Filter, ObjectId, UpdateFilter, UpdateOptions } from "mongodb";
import { DB } from "../../services/db/service";

export class UserService {
	constructor(protected collection = DB().collection<Users.user>("users")) {}
	async getOrCreateIfNotExists(user: Partial<Users.user> & Pick<Users.user, "clerkUserId" | "email">) {
		const email = user.email;

		const filter = { email };

		const existingUser = await this.collection.findOne(filter);

		if (existingUser) return existingUser;

		return await this.createUser(user);
	}

	async createUser(user: Partial<Users.user> & Pick<Users.user, "clerkUserId" | "email">) {
		const newUser = this.userTemplate(user);

		await this.collection.insertOne(newUser);

		return newUser;
	}

	parseUserFromRequest(request: Request) {
		return this.presentUser(request);
	}

	protected presentUser(request: Request) {
		const authUser = request.auth;

		const {
			email,
			email_verified: emailVerified,
			first_name: firstName,
			last_name: lastName,
			user_id: clerkUserId,
		} = authUser?.sessionClaims!;

		return {
			clerkUserId,
			email,
			emailVerified,
			firstName,
			lastName,
		};
	}

	async updateOne(
		filter: Filter<Users.user>,
		update: Document[] | UpdateFilter<Users.user>,
		options?: UpdateOptions,
	) {
		return await this.collection.updateOne(filter, update, options);
	}

	userTemplate(user: Partial<Users.user> & Pick<Users.user, "clerkUserId" | "email">): Users.user {
		return {
			_id: new ObjectId(),
			emailVerified: user?.emailVerified ?? false,
			farms: [],
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			sharedFarms: [],
			created_at: new Date(),
			deleted_at: null,
			updated_at: new Date(),
			...user,
			isAdmin: false,
		};
	}
}
