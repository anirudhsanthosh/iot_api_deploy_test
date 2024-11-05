import * as dotenv from "dotenv";
import { initServer } from "./app.js";
dotenv.config();

main();

async function main() {
	const app = await initServer();
}
