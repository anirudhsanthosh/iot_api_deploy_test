declare module Devices {
	interface device {
		_id: import("mongodb").ObjectId;
		name: string;
		farm_id: string | null;
		device_type: string | null;
		model?: string | null;
		owner: string | null;
		location?: Location | null;
		status?: string | null;
		last_active?: Date | null;
		created_at: Date;
		updated_at: Date;
		deleted_at: Date | null;
	}

	interface Location {
		lat: string;
		lng: string;
	}
}
