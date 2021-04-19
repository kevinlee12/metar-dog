<script lang="ts">
    import type { MetarData } from '$lib/MetarData'

    export let metarData: MetarData = undefined
</script>


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
