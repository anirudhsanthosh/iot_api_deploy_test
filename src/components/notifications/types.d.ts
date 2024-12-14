declare module Notifications {
	interface notification {
		_id: import("mongodb").ObjectId;
		created_at: Date;
		created_by: "admin" | "system";
		message: string;
		read: boolean;
		user_id: string;
	}
}
