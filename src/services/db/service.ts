import { to } from "@mrspartak/promises";
import { Db, MongoClient } from "mongodb";
import { AppConfig } from "../../config";

let _db: Db;

let _Client: MongoClient;

export function Client() {
	if (!_Client) throw new Error("Failed to create DB client");

	return _Client;
}

export function DB() {
	if (!_db) throw new Error("Failed to create DB client");

	return _db;
}

export async function initDb() {
	const [error, db] = await to(connectToDatabase());

	if (error) throw error;

	if (!db) throw new Error("Failed to create DB client");

	_db = db;

	return _db;
}

async function connectToDatabase() {
	const client = new MongoClient(AppConfig.MONGO_DB_URL);

	_Client = client;

	await client.connect();

	await client.db("admin").command({ ping: 1 });

	console.log("✅ successfully connected to db");

	return client.db(AppConfig.DATABASE);
}
