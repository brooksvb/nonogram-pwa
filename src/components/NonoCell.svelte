<script lang="ts">
    import { GridCell } from "/src/Game";
    
    export let gridCell: GridCell;
</script>
<div>
    x: {gridCell.x} y: {gridCell.y}
</div>

<style>
    div {
        width: 100px;
        height: 100px;
        margin: 10px;
        background-color: aqua;
    }
</style>