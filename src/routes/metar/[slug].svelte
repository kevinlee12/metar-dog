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
	import Metar from "$lib/components/Metar.svelte"
	import MetarRaw from "$lib/components/MetarRaw.svelte"

	export let metarData: MetarData

	let toggleText: string = "Raw"
	let changeShow = () => {
		if (toggleText == "Raw") {
			toggleText = "Decoded"
		} else {
			toggleText = "Raw"
		}
	}
</script>

<svelte:head>
	<title>{metarData.stationId} - METAR</title>
</svelte:head>

<main>
	<div class="container">
		<div class="d-flex flex-row p-3">
			<div class="flex-grow-1">
				{#if metarData != undefined}
					{#if toggleText == "Raw"}
						<Metar metarData={metarData} />
					{:else}
						<MetarRaw metarData={metarData} />
					{/if}
				{/if}
			</div>

			<div>
				<a on:click={changeShow}>{toggleText}</a>
			</div>
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
	h1 {
		font-family: 'Overpass Mono', monospace;
		font-size: 7vh;
		color: white;
	}

	a {
		color: white;
	}
</style>
