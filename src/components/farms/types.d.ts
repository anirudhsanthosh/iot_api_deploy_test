declare module Farms {
	interface farm {
		_id: import("mongodb").ObjectId;
		name: string;
		owner: string;
		shared_with: string[];
		devices: string[];
		deleted_at: Date | null;
		created_at: Date;
		updated_at: Date;
	}
}
