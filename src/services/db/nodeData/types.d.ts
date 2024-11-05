declare module NodeData {
	interface data {
		_id: string;
		device_id: string;
		farm_id: string;
		created_at: Date;
		time: Date;
		data: DataClass;
	}

	type DataClass = Record<definedDataTypesKeys, number | string>;

	type definedDataTypes = ["temperature_DHT", "temperature_SCD4X", "humidity_DHT", "humidity_SCD4X", "co2_SCD4X"];

	type definedDataTypesKeys = definedDataTypes[number];
}
