<script lang="ts">
    export let gridCell: import("src/Game").GridCell;
</script>
<div>
    {gridCell.state}
</div>

<style>
    div {
        width: 100px;
        height: 100px;
        margin: 10px;
        background-color: aqua;
    }
</style>