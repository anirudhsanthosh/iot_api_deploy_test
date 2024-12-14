const { parse } = require("fast-csv");

const { createReadStream, createWriteStream } = require("fs");

const { resolve } = require("path");

const propertyMappings = {
	// Timestamp: "2024-09-01 0:00:00",
	"CO2 (ppm)": "Co2",
	"Air Temperature (°C)": "temp",
	"Humidity (%)": "hum",
	"Wind Speed (m/s)": "Wsi",
	"VPD (kPa)": "Vpd",
	"PAR (µmol/m²/s)": "Par",
	"Stomatal Conductance (mmol/m²/s)": "Sc",
	"Nitrogen Absorption (mg)": "Na",
	"Potassium Absorption (mg)": "Ka",
	"Phosphorous Absorption (mg)": "Pa",
	"Evapotranspiration (mm)": "Et",
	"Active Growth Duration (hours)": "Agt",
	"Water Stress (%)": "Ws",
	"Nutrient Stress (%)": "N_stress",
	"Temperature Stress (%)": "T_stress",
	"Light Stress (%)": "L_stress",
};

const outputPath = "./sample/2-month-data.json";

const writeStream = createWriteStream(resolve(outputPath), {
	encoding: "utf8",
});

const list = [];

const parser = parse({ headers: true })
	.on("data", (data) => {
		const { Timestamp, ...rest } = data;

		const row = {
			device_id: "6700bfb5bb578bdca0a83ee0",
			farm_id: "6700a3ff20498545c4a70d44",
			time: (new Date(Timestamp).getTime() / 1000 + 1641600) * 1000,
			data: {},
		};

		for (const [key, value] of Object.entries(rest)) {
			row.data[propertyMappings[key]] = value;
		}

		list.push(row);
	})
	.on("end", () => {
		writeStream.write(JSON.stringify(list, null, 2));

		writeStream.end();
	});

const inputFile = `./scripts/two_months_sample_data.csv`;

const fileStream = createReadStream(resolve(inputFile), {
	encoding: "utf8",
});

fileStream.pipe(parser);
