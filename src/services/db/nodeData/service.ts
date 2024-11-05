import { ObjectId } from "mongodb";
import { DB } from "../service";

export class NodeDataService {
	constructor(protected collection = DB().collection<NodeData.data>("node_data")) {}

	async getByFarmId(farmId: string) {
		const filter = { farm_id: farmId };

		return await this.collection.find(filter).toArray();
	}

	async insertAll(data: (Partial<NodeData.data> & Pick<NodeData.data, "farm_id" | "device_id" | "data" | "time">)[]) {
		const formattedData = data.map(this.deviceTemplate.bind(this));

		this.collection.insertMany(formattedData);
	}

	async getByDeviceId(deviceId: string) {
		const filter = { device_id: deviceId };

		return await this.collection.find(filter).toArray();
	}

	async create(data: Partial<NodeData.data> & Pick<NodeData.data, "farm_id" | "device_id" | "data" | "time">) {
		const deviceObject = this.deviceTemplate(data);

		return await this.collection.insertOne(deviceObject);
	}

	async getDataByInterval(from: Date, to: Date, deviceId: string) {
		return await this.collection
			.find(
				{
					time: { $gte: from, $lte: to },
					device_id: deviceId,
				},
				{
					projection: {
						_id: 0,
						data: 1,
						time: 1,
						created_at: 1,
					},
				},
			)
			.toArray();
	}

	deviceTemplate(
		data: Partial<NodeData.data> & Pick<NodeData.data, "farm_id" | "device_id" | "data" | "time">,
	): NodeData.data {
		return {
			_id: new ObjectId().toString(),
			created_at: new Date(),
			...data,
		};
	}
}
