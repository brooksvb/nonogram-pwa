<script lang="ts">
    import { GridCell, CellState } from "/src/Game";

    export let gridCell: GridCell;


</script>
<div data-x={gridCell.x} data-y={gridCell.y} class:marked={gridCell.state === CellState.Marked} class:crossed={gridCell.state === CellState.Crossed}>

    x: {gridCell.x} y: {gridCell.y}
    <br>
    State: {gridCell.state}
</div>

<style>
    div {
        width: 65px;
        height: 65px;
        padding: 10px;
        border: 3px lightgray solid;
        /* Stop text from being highlighted */
        user-select: none; 
    }

    .selection {
        background-color: blue;
    }

    .marked {
        background-color: lightblue;
    }

    .crossed {
        background-color: purple;
    }
</style>