import type { SkyConditionData } from '$lib/SkyConditionData';

export class MetarData {
	metar: string;
	stationId: string;
	observationTime: Date;
	longitude: string;
	latitude: string;
	altimHg: string;
	dewpoint: number;
	elevation: number;
	temp: number;
	windDir: number;
	windSpeed: number;
	visibilitySM: number;
	skyCondition: SkyConditionData[];

	constructor() {
		this.skyCondition = new Array<SkyConditionData>();
	}
}

// altim_in_hg: "29.970472"
// dewpoint_c: "11.7"
// elevation_m: "30.0"
// flight_category: "VFR"
// latitude: "33.93"
// longitude: "-118.38"
// metar_type: "METAR"
// observation_time: "2021-03-31T02:53:00Z"
// quality_control_flags: Object { auto_station: "TRUE" }
// raw_text: "KLAX 310253Z 26007KT 10SM CLR 14/12 A2997 RMK AO2 SLP148 T01390117 53014"
// sea_level_pressure_mb: "1014.8"
// sky_condition: Object { "$": {…} }
// station_id: "KLAX"
// temp_c: "13.9"
// three_hr_pressure_tendency_mb: "1.4"
// visibility_statute_mi: "10.0"
// wind_dir_degrees: "260"
// wind_speed_kt: "7"
