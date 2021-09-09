<script>
	import PauseMenu from "./PauseMenu.svelte";

	export let controller;

	let isPaused = false;

	const onpause = () => {
		isPaused = true;
		controller.stopTimer();
	};

	const onresume = () => {
		isPaused = false;
		controller.startTimer();
	};
</script>

<button on:click={onpause} class="border-2 border-blue-300 rounded-md p-2">Pause</button>

<PauseMenu modalActive={isPaused} on:resume={onresume} />
