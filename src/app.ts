import bodyParser from "body-parser";
import express, { json } from "express";
import "express-async-errors";
import { DeviceRouter, FarmRouter, UserRouter } from "./components";
import { AnalyticsRouter } from "./components/analytics/routes";
import { MockRouter } from "./components/mock";
import { createCorsMiddleware, createErrorHandlerMiddleware } from "./middlewares";
import { initDb } from "./services";

export async function initServer() {
	const DB = await initDb();

	// const mqttClient = await initiateMqttClient();

	const app = express();

	app.use(json({ limit: "5mb" }));

	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(createCorsMiddleware());

	app.get("/", (_, res) => {
		res.send(`Hey there it's lonely here..... 😔`);
	});

	app.use("/user", UserRouter);

	app.use(FarmRouter);

	app.use(DeviceRouter);

	app.use(AnalyticsRouter);

	app.use(MockRouter);

	app.use(createErrorHandlerMiddleware());

	const PORT = process.env.PORT || 5000;

	app.listen(PORT, () => {
		console.log(`🚀 server is running @ port ${PORT}`);
	});

	return app;
}
