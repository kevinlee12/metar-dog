<script lang="ts">
    import type { MetarData } from '$lib/MetarData'

    export let metarData: MetarData = undefined
</script>

<div>
    <strong>Raw Metar</strong>
</div>
<div>
    {metarData.metar}
</div>
