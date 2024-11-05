import { InsertOneOptions, ObjectId } from "mongodb";
import { DB } from "../../services/db/service";

export class DeviceService {
	constructor(public collection = DB().collection<Devices.device>("devices")) {}

	async getAll(farmId: string) {
		const filter = { farm_id: farmId };

		return await this.collection.find(filter).toArray();
	}

	async get(deviceId: string) {
		return await this.collection.findOne({ _id: new ObjectId(deviceId) });
	}

	async create(
		device: Partial<Devices.device> & Pick<Devices.device, "farm_id" | "name" | "device_type">,
		options?: InsertOneOptions,
	) {
		const deviceObject = this.deviceTemplate(device);

		await this.collection.insertOne(deviceObject, options);

		return deviceObject;
	}

	deviceTemplate(farm: Partial<Devices.device> & Pick<Devices.device, "name">): Devices.device {
		return {
			_id: new ObjectId(),
			created_at: new Date(),
			deleted_at: null,
			updated_at: new Date(),
			farm_id: null,
			owner: null,
			status: "inactive",
			last_active: null,
			device_type: null,
			...farm,
		};
	}
}
