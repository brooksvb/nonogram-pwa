<script>
	import PauseMenu from "./PauseMenu.svelte";

	let isPaused = false;
</script>

<button on:click={() => isPaused = !isPaused} class="border-2 border-blue-300 rounded-md p-2">Pause</button>

<PauseMenu modalActive={isPaused} on:unpause={() => isPaused = false} />
