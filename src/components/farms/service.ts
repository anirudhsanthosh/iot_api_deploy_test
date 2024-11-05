import { Filter, InsertOneOptions, ObjectId, UpdateFilter, UpdateOptions } from "mongodb";
import { DB } from "../../services/db/service";

export class FarmService {
	constructor(public collection = DB().collection<Farms.farm>("farms")) {}

	async getAll(userId: string) {
		const pipeline = [
			{
				$match: {
					$or: [{ owner: userId }, { shared_with: userId }],
				},
			},
			{
				$addFields: {
					shared: { $ne: ["$owner", userId] },
				},
			},
		];

		return await this.collection.aggregate<Farms.farm & { shared: boolean }>(pipeline).toArray();
	}

	async get(farmId: string) {
		return await this.collection.findOne({ _id: new ObjectId(farmId) });
	}

	async create(farm: Partial<Farms.farm> & Pick<Farms.farm, "owner" | "name">, options?: InsertOneOptions) {
		const farmObject = this.farmTemplate(farm);

		await this.collection.insertOne(farmObject);
		return farmObject;
	}

	async updateOne(
		filter: Filter<Farms.farm>,
		update: Document[] | UpdateFilter<Farms.farm>,
		options?: UpdateOptions,
	) {
		return await this.collection.updateOne(filter, update, options);
	}

	farmTemplate(farm: Partial<Farms.farm> & Pick<Farms.farm, "owner" | "name">): Farms.farm {
		return {
			_id: new ObjectId(),
			created_at: new Date(),
			deleted_at: null,
			devices: [],
			shared_with: [],
			updated_at: new Date(),
			...farm,
		};
	}
}
