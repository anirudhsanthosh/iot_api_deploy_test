import { InsertOneOptions, ObjectId } from "mongodb";
import { DB } from "../../services/db/service";

export class NotificationService {
	constructor(public collection = DB().collection<Notifications.notification>("notifications")) {}

	async getAll(userId: string) {
		const filter = { user_id: userId };

		return await this.collection
			.find(filter)
			.sort({
				//read: 1,
				created_at: -1,
			})
			.toArray();
	}

	async get(notificationId: string) {
		return await this.collection.findOne({ _id: new ObjectId(notificationId) });
	}

	async update(notificationId: string, notification: Partial<Notifications.notification>) {
		await this.collection.updateOne({ _id: new ObjectId(notificationId) }, { $set: notification });
	}

	async markAsRead(notificationId: string) {
		await this.collection.updateOne({ _id: new ObjectId(notificationId) }, { $set: { read: true } });
	}

	async markAllAsRead(userId: string) {
		await this.collection.updateMany({ user_id: userId }, { $set: { read: true } });
	}

	async delete(notificationId: string) {
		await this.collection.deleteOne({ _id: new ObjectId(notificationId) });
	}

	async deleteAll(userId: string) {
		await this.collection.deleteMany({ user_id: userId });
	}

	async markUnread(notificationId: string) {
		await this.collection.updateOne({ _id: new ObjectId(notificationId) }, { $set: { read: false } });
	}

	async create(
		notification: Partial<Notifications.notification> & Pick<Notifications.notification, "user_id" | "message">,
		options?: InsertOneOptions,
	) {
		const notificationObject = this.notificationTemplate(notification);

		await this.collection.insertOne(notificationObject, options);

		return notificationObject;
	}

	notificationTemplate(
		notification: Partial<Notifications.notification> & Pick<Notifications.notification, "user_id" | "message">,
	): Notifications.notification {
		return {
			_id: new ObjectId(),
			created_at: new Date(),
			created_by: "system",
			read: false,
			...notification,
		};
	}
}
