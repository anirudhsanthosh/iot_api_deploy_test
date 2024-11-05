import { createMqttClient } from "./aws/service";
import { mqttMessageListenerBinder } from "./listener.bindings";
import { mqttTopicSubscribers } from "./subscriber.bindings";

export async function initiateMqttClient() {
	const mqttClient = await createMqttClient();

	mqttMessageListenerBinder(mqttClient);

	mqttTopicSubscribers(mqttClient);

	return mqttClient;
}
