<script>
import { GameController, SelectionMode } from "/src/Game";
import { timerStore } from "/src/stores";
import { onMount } from "svelte";
import { fade, fly } from "svelte/transition";
import { base } from "$app/paths";

import NonoGrid from "./NonoGrid.svelte";
import GameTimer from "./GameTimer.svelte";
import PauseButton from "./PauseButton.svelte";
import GameWinModal from "./GameWinModal.svelte";

const crossmarkSvg = base + '/crossmark.svg';
const pencilSvg = base + '/pencil-pictogram.svg';

let controller = new GameController();

export let rows;
export let cols;

let displayIncompleteMessage = false;
let gameWin = false;
let completionTime = null;

controller.startNewGrid(cols, rows);

onMount(() => {
	$timerStore = 0;
	controller.startTimer();
});

const submitSolution = () => {
	if (controller.solutionIsValid()) {
		// Grid complete
		controller.stopTimer();
		completionTime = $timerStore;
		gameWin = true;
	} else {
		// Show message
		displayIncompleteMessage = true;
		removeMessageAfterDelay();
	}
};

const removeMessageAfterDelay = () => {
	// After 3 seconds, remove popup message
	setTimeout(() => {
		displayIncompleteMessage = false;
	}, 3000);
}
</script>

{#if gameWin}
<GameWinModal {completionTime} />
{/if}

<div id="game-container" class="px-2 h-screen" style="--crossmarkSvg: url({crossmarkSvg}); --pencilSvg: url({pencilSvg})">
	<div id="game-header" class="flex flex-shrink-0 flex-grow-0 items-center justify-end text-3xl">
		{#if displayIncompleteMessage}
		<span class="inline-block fixed top-2 left-2 sm:relative sm:top-0 sm:left-0 sm:ml-4 sm:mr-auto px-4 py-2 text-xl rounded-sm bg-yellow-200" in:fly={{ y: -50, duration: 1000 }} out:fade>Puzzle is not yet complete</span>
		{/if}

		<GameTimer />
		<PauseButton {controller} />
	</div>

	<NonoGrid controller={controller} />

	<div id="game-footer" class="flex flex-shrink-0 flex-grow-0 justify-center items-center py-2">
		<button class="hidden sm:block invisible mr-auto ml-16">Submit</button>
		<button id="mark-button" class="mx-2" on:click={() => controller.selectionMode = SelectionMode.Marking} class:active={controller.selectionMode === SelectionMode.Marking}><div></div></button>
		<button id="cross-button" class="mx-2" on:click={() => controller.selectionMode = SelectionMode.Crossing} class:active={controller.selectionMode === SelectionMode.Crossing}></button>
		<button id="submit-button" on:click={submitSolution} class="mx-2 sm:ml-auto sm:mr-16">Submit</button>
	</div>
</div>

<style lang="postcss">
	#game-container {
		@apply flex flex-col h-screen;
	}

	#game-header, #game-footer {
		height: 10vh;
	}

	#game-footer > button {
		@apply bg-gray-300 border border-gray-400 rounded-md text-lg p-4 h-full;
	}

	#submit-button, #game-footer > button.hidden {
		@apply bg-blue-300 active:bg-blue-400 text-2xl !important;
	}

	#mark-button, #cross-button {
		@apply active:bg-yellow-400;
		aspect-ratio: 1/1;
	}

	#game-footer > button.active {
		@apply bg-yellow-500;
	}

	#mark-button > div {
		width: 100%;
		height: 100%;
		background-image: var(--pencilSvg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	#cross-button {
		background-image: var(--crossmarkSvg);
		background-position: center;
		background-repeat: no-repeat;
	}
</style>