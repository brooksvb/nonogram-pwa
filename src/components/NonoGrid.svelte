<script lang="ts">
import type { Grid } from "/src/Game";
import { DragSelector } from "/src/Game";

import NonoCell from "./NonoCell.svelte";
import type { GameController } from "src/Game";

export let grid: Grid;
export let controller: GameController

let dragSelector = new DragSelector(grid, controller);

let valid = false;

</script>

<h1>
    valid: {valid}
</h1>

<div class="grid-container" on:mousedown={dragSelector.onMouseDown} on:mousemove="{() => valid = dragSelector.isValidSelection()}">
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