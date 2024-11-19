import { Router } from "express";
import { NodeDataService } from "../../services";

import datas from "./2-month-data.json";
// import datas from "./sample_node_data.json";

export const MockRouter = Router();

MockRouter.get("/test/insert", async (req, res) => {
	const formatted = datas.map((data) => ({ ...data, time: new Date(data.time) }));

	//@ts-ignore
	const record = await new NodeDataService().insertAll(formatted);

	res.json({ data: 333 });
});
