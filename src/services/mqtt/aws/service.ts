import { deferred } from "@mrspartak/promises";
import awsIot from "aws-iot-device-sdk";
import { resolve } from "path";

export function initMqtt() {
	// const keyPath = resolve("cert", "private.pem.key");
	// const certPath = resolve("cert", "certificate.pem.crt");
	// const caPath = resolve("cert", "AmazonRootCA1.pem");
	// const clientId = "iot-user-dashboard-api";
	// const host = "a26ti56gw0s4uq-ats.iot.eu-north-1.amazonaws.com";
	// const configBuilder = iot.AwsIotMqttConnectionConfigBuilder.new_builder_for_websocket(certPath, keyPath);
	// configBuilder.with_endpoint(host);
	// configBuilder.with_client_id("iot-user-dashboard-api");
	// const config = configBuilder.build();
	// const client = new mqtt.MqttClient();
	// const c = client.new_connection(config);
	// c.on("connect", (event) => {
	//     console.log("Connected to AWS IoT Core", event);
	// });
	// c.on("connection_failure", (error) => {
	//     console.log("connection failed", error);
	// });
	// c.on("error", (error) => {
	//     console.log("client error", error);
	// });
	// c.connect();
	// client.start();
}

export async function createMqttClient() {
	const { promise, reject, resolve: promiseResolve } = deferred<awsIot.device>();

	const device = new awsIot.device({
		keyPath: resolve("cert", "private.pem.key"),
		certPath: resolve("cert", "certificate.pem.crt"),
		caPath: resolve("cert", "AmazonRootCA1.pem"),
		clientId: "iot-user-dashboard-api",
		host: "a26ti56gw0s4uq-ats.iot.eu-north-1.amazonaws.com",
		resubscribe: true,
		keepalive: 10,
	});

	device.on("connect", () => {
		console.log(`🔗 Connected with MQTT 🚦 Broker`);
		promiseResolve(device);
	});

	device.on("error", (error) => reject(error));

	return await promise;
}
