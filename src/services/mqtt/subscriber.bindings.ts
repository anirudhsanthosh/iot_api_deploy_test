import { device } from "aws-iot-device-sdk";
import { TOPICS } from "./constants";

export function mqttTopicSubscribers(device: device) {
	TOPICS.forEach((topic) => {
		device.subscribe(topic);
	});
}
