const fs = require("fs");

const deviceId = "672aec297019134b5661bf69";
const farmId = "6700a3ff20498545c4a70d44";
const startTime = new Date().getTime() - 1 * 24 * 60 * 60 * 1000;
const interval = 5 * 60 * 1000; // 5 minutes

const eventCount = 1000;

function generateSampleData(numSamples) {
	const sampleData = [];
	for (let i = 0; i < numSamples; i++) {
		const createdAt = startTime + interval * i;

		const sample = {
			device_id: deviceId,
			farm_id: farmId,
			time: createdAt,
			data: {
				hum: Math.floor(Math.random() * (90 - 20 + 1)) + 20,
				temp: Math.floor(Math.random() * (35 - 10 + 1)) + 10,
				Co2: Math.floor(Math.random() * (800 - 300 + 1)) + 300,
				Par: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
				Et: Math.floor(Math.random() * 11),
				Vpd: Math.floor(Math.random() * 6),
				Sc: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
				Ws: Math.floor(Math.random() * (30 - 10 + 1)) + 10,
				Wsi: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
				Na: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
				Pa: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
				Ka: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
				Agt: Math.floor(Math.random() * (40 - 20 + 1)) + 20,
				N_stress: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
				T_stress: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
			},
		};
		sampleData.push(sample);
	}
	return sampleData;
}

// Generate 100 samples
const data = generateSampleData(eventCount);

// Save to JSON file
fs.writeFileSync("sample/sample_node_data.json", JSON.stringify(data, null, 2), "utf-8");

console.log("Sample data generated and saved to sample_data.json");
