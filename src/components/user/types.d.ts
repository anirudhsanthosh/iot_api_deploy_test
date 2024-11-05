declare module Users {
	interface user {
		_id: import("mongodb").ObjectId;
		firstName: string;
		lastName: string;
		email: string;
		farms: string[];
		sharedFarms: string[];
		emailVerified: boolean;
		clerkUserId: string;
		created_at: Date;
		deleted_at: Date | null;
		updated_at: Date;
		isAdmin: boolean;
	}
}
