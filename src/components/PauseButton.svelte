<script>
	import PauseMenu from "./PauseMenu.svelte";

	let isPaused = false;
</script>

<button on:click={() => isPaused = !isPaused}>Pause</button>

<PauseMenu modalActive={isPaused} on:unpause={() => isPaused = false} />

<style>
	button {
		font-size: 2em;
	}
</style>