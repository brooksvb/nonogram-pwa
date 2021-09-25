<script>
import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let modalActive = false;

	// Inlining a `return confirm()` directly in the anchor tag did not work as expected
	let confirmLeave = (e) => {
		if (!confirm('Are you sure you want to leave? You will lose your progress on this level.')) {
			e.preventDefault();
		}
	};
</script>

<div id="backdrop" style={!modalActive ? 'display: none;' : ''}></div>
<div id="menu" style={!modalActive ? 'display: none;' : ''}>
	<h1 class="text-6xl mb-4 uppercase">Paused</h1>

	<div class="flex flex-col h-full justify-center align-middle gap-8">
		<a href="/" class="block text-4xl bg-red-300 p-4 rounded-md" on:click={confirmLeave}>Return to main menu</a>
		<button on:click={() => dispatch('resume')}
			class="text-4xl p-4 bg-green-300 border-2 border-green-400 rounded-md"
			>Resume Game</button>
	</div>

</div>

<style lang="postcss">

	#backdrop {
		position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
		background-color: rgba(0, 0, 0, .6);
	}

    #menu {
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);

		width: 100vw;
		height: 80vh;
		box-sizing: border-box;
		padding: 20px;

		display: flex;
		flex-direction: column;
		align-items: center;

    }
</style>