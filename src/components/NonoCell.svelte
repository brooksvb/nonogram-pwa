<script lang="ts">
    import { GridCell } from "/src/Game";

    export let gridCell: GridCell;
</script>
<div data-x={gridCell.x} data-y={gridCell.y}>

    x: {gridCell.x} y: {gridCell.y}
</div>

<style>
    div {
        width: 100px;
        height: 100px;
        padding: 10px;
        background-color: aqua;
    }

    .selection {
        background-color: blue;
    }
</style>