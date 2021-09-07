<script lang="ts">
import type { Grid } from "/src/Game";

import NonoCell from "./NonoCell.svelte";

export let grid: Grid;

</script>

<div class="grid-container">
    {#each grid.grid as column}
    <div class="grid-column">
        {#each column as gridCell}
        <NonoCell gridCell={gridCell} />
        {/each}
    </div>
    {/each}
</div>

<style>
    .grid-container {
        display: flex;
        flex-direction: row;
    }

    .grid-column {
        display: flex;
        flex-direction: column-reverse;
    }
</style>