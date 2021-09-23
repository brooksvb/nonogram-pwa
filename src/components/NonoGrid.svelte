<script lang="ts">
import { onMount } from "svelte";

import type { GridData } from "/src/Game";
import { DragSelector } from "/src/DragSelector";
import { gridStore, currentSelectionStore } from "/src/stores";

import NonoCell from "./NonoCell.svelte";
import { GameController, SelectionMode } from "/src/Game";
import { GridHelper } from "/src/Game";

export let controller: GameController

let dragSelector = new DragSelector(controller);

// DOM Elements
let gridSlot;
let columnHeadings;
let rowHeadings;

// This function calculates the size of cells based on screen space
const resizeCells = () => {
    // Max height and width available
    let maxHeight = gridSlot.clientHeight;
    let maxWidth = gridSlot.clientWidth;

    // Get height and width occupied by headers
    let colHeaderHeight = columnHeadings.clientHeight;
    let rowHeaderWidth = rowHeadings.clientWidth;

    // Divide remaining space among rows and cols
    let availableHeight = (maxHeight - colHeaderHeight) / controller.getRows();
    let availableWidth = (maxWidth - rowHeaderWidth) / controller.getCols();

    // Choose smallest for both dimensions to make square
    let targetCellSize = (availableHeight < availableWidth ? availableHeight : availableWidth) + 'px';

    // console.log(`Resizing to target: ${targetCellSize}`);

    [...document.getElementsByClassName('grid-column')].forEach((colElem) => {
        colElem.style.width = targetCellSize;
    });
}

onMount(() => resizeCells());

</script>

<svelte:window on:resize={resizeCells}></svelte:window>

<div id="grid-slot" class="flex" bind:this={gridSlot}>
    <div id="grid-container">
        <div id="column-headings" bind:this={columnHeadings}>
            {#each $gridStore as column}
                <span>
                    {#each GridHelper.getColGroups(column[0].x) as groupNum}
                    {groupNum}<br>
                    {/each}
                </span>
            {/each}
        </div>
        <div id="row-headings" bind:this={rowHeadings}>
            {#each $gridStore[0] as rowCell}
                <div>
                <span>
                    {#each GridHelper.getRowGroups(rowCell.y) as groupNum}
                    {groupNum}&nbsp;
                    {/each}
                </span>
                </div>
            {/each}
        </div>

        <div id="cell-container" 
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
</div>

<style lang="postcss">
    #grid-slot {
        height: 80vh;
    }
    #grid-container {
        width: min-content; /* Needed to scale down column headers with cell size */
        margin: auto; /* Centers horizontally and vertically (thanks to flex grid-slot) */
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-template-columns: max-content 1fr;
        grid-template-areas: "x col"
                             "row cells";
    }

    #column-headings, #row-headings {
        @apply text-xl sm:text-3xl md:text-4xl;
    }

    #column-headings {
        grid-area: col;
        display: flex;
        align-items: flex-end;
    }
    #column-headings > span {
        width: 100%;
        text-align: center;
    }

    #row-headings {
        grid-area: row;
        display: flex;
        flex-direction: column-reverse;
    }

    #row-headings > div {
        height: 100%;
        vertical-align: middle;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #cell-container {
        grid-area: cells;
        display: flex;
        flex-direction: row;
    }

    .grid-column {
        display: flex;
        flex-direction: column-reverse;
        width: 50px;
    }
</style>