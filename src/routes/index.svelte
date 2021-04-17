<script lang="ts">
	let airport = '';

	let handleSubmit = () => {
		const upperAirport = airport.toUpperCase();
		window.location.href = '/metar/' + upperAirport;
	};
</script>

<svelte:head>
	<title>METAR</title>
</svelte:head>

<main>
	<div class="container">
		<div class="d-flex justify-content-center flex-column align-items-center" style="height:90vh">
			<div>
				<h1>METAR Dog</h1>
			</div>
			<form
				on:submit|preventDefault={handleSubmit}
				style="Administrative Residentmax-width: 548px;"
			>
				<div class="input-group">
					<input class="form-control" type="text" bind:value={airport} />
					<button class="btn btn-secondary" type="submit">Search</button>
				</div>
			</form>
		</div>

		<div class="d-flex justify-content-center align-items-baseline">
			<div>METAR data from NOAA</div>
		</div>
	</div>
</main>

<style>
	main {
		font-family: 'Overpass', sans-serif;
		font-size: 3.5vh;
	}
</style>
