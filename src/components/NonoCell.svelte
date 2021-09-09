<script lang="ts">
    import { currentSelectionStore } from "/src/stores";

    import { GridCell, CellState } from "/src/Game";
    import { GridHelper } from "/src/Game";

    export let gridCell: GridCell;

    let isSelected = false;
    $: {
        if ($currentSelectionStore === null || !$currentSelectionStore.valid) {
            isSelected = false;
        } else {
            isSelected = GridHelper.coordsAreInSelection(gridCell.x, gridCell.y, $currentSelectionStore);
        }
    }

</script>
<div data-x={gridCell.x} data-y={gridCell.y} 
class:marked={gridCell.state === CellState.Marked} 
class:crossed={gridCell.state === CellState.Crossed}
class:selection={isSelected}
></div>

<style>
    div {
        aspect-ratio: 1/1;
        padding: 10px;
        border: 2px lightgray solid;
        /* Stop text from being highlighted */
        user-select: none; 
    }

    .marked {
        @apply bg-blue-400;
    }
    
    .crossed {
        background-image: url('/crossmark.svg');
    }
    
    .selection:not(.marked, .crossed) {
        @apply bg-blue-200;
    }

    .selection.crossed, .selection.marked {
        filter: brightness(.8);
    }
</style>