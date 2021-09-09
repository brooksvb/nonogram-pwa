<script>
	import PauseMenu from "./PauseMenu.svelte";
	
	let isPaused = false;
</script>

<button>Pause</button>

{#if isPaused}
<PauseMenu />
{/if}

<style>
	button {
		font-size: 2em;
	}
</style>