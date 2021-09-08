<script lang="ts">
    import { GridCell, CellState } from "/src/Game";

    export let gridCell: GridCell;
</script>
<div data-x={gridCell.x} data-y={gridCell.y} class:marked="{gridCell.state === CellState.marked}" class:crossed="{gridCell.state === CellState.Crossed}">

    x: {gridCell.x} y: {gridCell.y}
</div>

<style>
    div {
        width: 100px;
        height: 100px;
        padding: 10px;
        border: 3px lightgray solid;
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