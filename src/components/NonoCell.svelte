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
            isSelected = GridHelper.coordsInSelection(gridCell.x, gridCell.y, $currentSelectionStore);
        }
    }
</script>
<div data-x={gridCell.x} data-y={gridCell.y} 
class:marked={gridCell.state === CellState.Marked} 
class:crossed={gridCell.state === CellState.Crossed}
class:selection={isSelected}
>

    x: {gridCell.x} y: {gridCell.y}
    <br>
    State: {gridCell.state}
</div>

<style>
    div {
        width: 100%;
        aspect-ratio: 1/1;
        padding: 10px;
        border: 3px lightgray solid;
        /* Stop text from being highlighted */
        user-select: none; 
    }

    .marked {
        background-color: lightblue;
    }
    
    .crossed {
        background-color: purple;
    }
    
    .selection {
        background-color: blue;
    }
</style>