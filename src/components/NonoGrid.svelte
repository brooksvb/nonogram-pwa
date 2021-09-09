<script lang="ts">
import type { GridData } from "/src/Game";
import { DragSelector } from "/src/DragSelector";
import { gridStore, currentSelectionStore } from "/src/stores";

import NonoCell from "./NonoCell.svelte";
import { GameController, SelectionMode } from "/src/Game";
import { GridHelper } from "/src/Game";

export let controller: GameController

let dragSelector = new DragSelector(controller);


let valid = false;
$: {
    if ($currentSelectionStore !== null) {
        valid = $currentSelectionStore.valid;
    } else valid = false;
}

</script>

<h1>
    valid: {valid}
</h1>

<div class="grid-container">
    <div class="column-headings">
        {#each $gridStore as column}
            <span>
                {#each GridHelper.getColGroups(column[0].x) as groupNum}
                {groupNum}<br>
                {/each}
            </span>
        {/each}
    </div>
    <div class="row-headings">
        {#each $gridStore[0] as rowCell}
            <span>
                {#each GridHelper.getRowGroups(rowCell.y) as groupNum}
                {groupNum}&nbsp;
                {/each}
            </span>
        {/each}
    </div>

    <div class="cell-container" 
    on:mousedown={dragSelector.onMouseDown}
    on:touchstart={dragSelector.onTouchStart}
    >
        {#each $gridStore as column}
        <div class="grid-column">
            {#each column as gridCell}
            <NonoCell gridCell={gridCell} />
            {/each}
        </div>
        {/each}
    </div>
</div>

<div>
    <button on:click={() => controller.selectionMode = SelectionMode.Marking} class:active={controller.selectionMode === SelectionMode.Marking}>Mark</button>
    <button on:click={() => controller.selectionMode = SelectionMode.Crossing} class:active={controller.selectionMode === SelectionMode.Crossing}>Cross</button>
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-rows: 150px 1fr;
        grid-template-columns: 150px 1fr;
        grid-template-areas: "x col"
                             "row cells";
    }

    .column-headings {
        grid-area: col;
        display: flex;
        align-items: flex-end;
    }
    .column-headings > span {
        width: 100%;
        text-align: center;
        font-size: 1.8em;
    }

    .row-headings {
        grid-area: row;
        display: flex;
        flex-direction: column-reverse;
    }

    .row-headings > span {
        height: 100%;
        vertical-align: middle;
        font-size: 1.8em;
        text-align: right;
    }

    .cell-container {
        grid-area: cells;
        display: flex;
        flex-direction: row;
    }

    .grid-column {
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
    }
</style>