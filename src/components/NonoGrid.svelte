<script lang="ts">
import type { Grid } from "/src/Game";

import NonoCell from "./NonoCell.svelte";

export let grid: Grid;

</script>

<div>
    {#each grid.grid as column}
        {#each column as gridCell}
        <NonoCell gridCell={gridCell} />
        {/each}
    {/each}
</div>