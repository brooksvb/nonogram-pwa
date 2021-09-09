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
	<h1>Paused</h1>
	<a href="/" on:click={confirmLeave}>Return to main menu</a>
	<button id="resume" on:click={() => dispatch('unpause')}>Resume Game</button>
</div>

<style>
	h1 {
		text-transform: uppercase;
	}

	a {
		display: block;
	}

	#resume {
		font-size: 1.5em;	
		padding: 15px;
		margin-top: auto;
		margin-bottom: 30px;
	}

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

		font-size: 1.8em;
    }
</style>