import { device } from "aws-iot-device-sdk";
import { TextDecoder } from "util";
import { DeviceService } from "../../components/device/service";
import { NodeDataService } from "../db/nodeData/service";

const decor = new TextDecoder("utf-8");

async function farmDataListener(topic: string, payload: any) {
	if (topic !== "FARM/DATA") return;

	const data = JSON.parse(decor.decode(payload));

	console.log(data);

	const { device_id, data: evebtData } = data;

	if (!device_id || !evebtData) return;

	const device = await new DeviceService().get(device_id);

	console.log({ device });

	if (!device) return;

	const record = await new NodeDataService().create({
		device_id,
		data: evebtData,
		farm_id: device.farm_id!,
		time: new Date(),
	});

	console.log(record);
}

export function mqttMessageListenerBinder(device: device) {
	device.on("message", farmDataListener);
}
