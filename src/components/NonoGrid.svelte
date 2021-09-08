<script lang="ts">
import type { GridData } from "/src/Game";
import { DragSelector } from "/src/Game";
import { gridStore } from "src/stores";

import NonoCell from "./NonoCell.svelte";
import { GameController, SelectionMode } from "/src/Game";

export let controller: GameController
export let grid: GridData;

let dragSelector = new DragSelector(grid, controller);

let valid = false;

</script>

<h1>
    valid: {valid}
</h1>

<div class="grid-container" on:mousedown={dragSelector.onMouseDown} on:mousemove="{() => valid = dragSelector.isValidSelection()}">
    {#each $gridStore as column}
    <div class="grid-column">
        {#each column as gridCell}
        <NonoCell gridCell={gridCell} />
        {/each}
    </div>
    {/each}
</div>

<div>
    <button on:click={() => controller.selectionMode = SelectionMode.Marking} class:active={controller.selectionMode === SelectionMode.Marking}>Mark</button>
    <button on:click={() => controller.selectionMode = SelectionMode.Crossing} class:active={controller.selectionMode === SelectionMode.Crossing}>Cross</button>
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