<script lang="ts">
import NonoCell from "./NonoCell.svelte";

export let gridRows: number = 10;
export let gridCols: number = 10;



</script>

<div>
    {#each Array(gridRows) as _}
    <NonoCell />
    {/each}
</div>