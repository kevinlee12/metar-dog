<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { MetarData } from '$lib/MetarData';
	import { SkyConditionData } from '$lib/SkyConditionData';

	export const load: Load = async (input) => {
		const { slug } = input.page.params;

		const url = '/api?icao=<icaoCode>'.replace('<icaoCode>', slug);

		const res = await input.fetch(url);
		const metarData = setInformation(await res.json());

		return {
			props: {
				metarData: metarData
			}
		};
	};

	const setInformation = function (data: any) {
		let metarData = new MetarData();
		metarData.metar = data.raw_text;
		metarData.observationTime = new Date(data.observation_time);
		metarData.windSpeed = data.wind_speed_kt;
		metarData.windDir = data.wind_dir_degrees;
		metarData.visibilitySM = data.visibility_statute_mi;

		if ('0' in data.sky_condition) {
			Object.keys(data.sky_condition).forEach((k) => {
				let skyConditionRaw = data.sky_condition[k];
				let skyCondition = new SkyConditionData(
					skyConditionRaw.sky_cover,
					skyConditionRaw.cloud_base_ft_agl
				);
				metarData.skyCondition.push(skyCondition);
			});
		} else {
			let skyConditionRaw = data.sky_condition;
			let skyCondition = new SkyConditionData(
				skyConditionRaw.sky_cover,
				skyConditionRaw.cloud_base_ft_agl
			);
			metarData.skyCondition.push(skyCondition);
		}
		metarData.temp = data.temp_c;
		metarData.dewpoint = data.dewpoint_c;
		metarData.altimHg = data.altim_in_hg;
		metarData.latitude = data.latitude;
		metarData.longitude = data.longitude;
		metarData.elevation = data.elevation_m;
		metarData.stationId = data.station_id;
		return metarData;
	};
</script>

<script lang="ts">
	export let metarData: MetarData;
</script>

<svelte:head>
	<title>{metarData.stationId} - METAR</title>
</svelte:head>

<main>
	<div class="container">
		<div class="row mt-3">
			{#if metarData != undefined}
				<div>
					<strong>Observation Time</strong>
				</div>
				<div>
					{metarData.observationTime.toLocaleString()}
				</div>
				<div>
					<strong>Wind</strong>
				</div>
				<div>
					{metarData.windSpeed} kt {#if metarData.windSpeed > 0} @ {metarData.windDir}° {/if}
				</div>
				<div>
					<strong>Visibility</strong>
				</div>
				<div>
					{metarData.visibilitySM} SM
				</div>
				<div>
					<div>
						<strong>Sky Condition</strong>
					</div>
					{#each metarData.skyCondition as skyCondition}
						<div>
							{#if skyCondition.cloudBaseAgl == undefined}
								Sky Cover: {skyCondition.skyCover}
							{:else}
								Sky Cover: {skyCondition.skyCover} @ {skyCondition.cloudBaseAgl} AGL
							{/if}
						</div>
					{/each}
				</div>
				<div>
					<strong>Temperature</strong>
				</div>
				<div>
					{metarData.temp}°C
				</div>
				<div>
					<strong>Dewpoint</strong>
				</div>
				<div>
					{metarData.dewpoint}°C
				</div>
				<div>
					<strong>Altimeter</strong>
				</div>
				<div>
					{metarData.altimHg} inHg
				</div>
			{/if}
		</div>

		<div class="d-flex flex-row-reverse">
			<div class="pe-3">
				<h1>
					<a href={'https://airnav.com/airport/' + metarData.stationId} target="_blank"
						>{metarData.stationId}</a
					>
				</h1>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		font-family: 'Overpass', sans-serif;
		font-size: 3.5vh;
	}

	strong {
		font-size: 4vh;
	}

	h1 {
		font-family: 'Overpass Mono', monospace;
		font-size: 7vh;
		color: white;
	}

	a {
		color: white;
	}
</style>
