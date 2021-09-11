<script>
import { GameController } from "/src/Game";

import NonoGrid from "./NonoGrid.svelte";
import { gridStore, timerStore } from "/src/stores";
import { SelectionMode } from "/src/Game";
import GameTimer from "./GameTimer.svelte";
import PauseButton from "./PauseButton.svelte";
import { onMount } from "svelte";

let controller = new GameController();

export let rows;
export let cols;
controller.startNewGrid(cols, rows);

onMount(() => {
	$timerStore = 0;
	controller.startTimer();
});

const submitSolution = () => {
	if (controller.checkSolution()) {
		// Grid complete
		// Show summary, completed in x time
		// Button to play again or return to main menu
	} else {
		// Show message
		// Shake a little
		// Grid has errors
	}
};
</script>

<!-- <button on:click={() => controller.startNewGrid()}>New Grid</button> -->

<div id="game-container" class="px-2 h-screen">
	<div class="flex items-center justify-end text-3xl">
		<GameTimer />
		<PauseButton {controller} />
	</div>

	<div class="h-full">
		<div class="h-auto flex-shrink">
			<NonoGrid controller={controller} />
		</div>
	</div>

	<div id="game-footer" class="flex justify-center items-center py-2">
		<button class="invisible mr-auto ml-16">Submit</button>
		<button id="mark-button" class="mx-2" on:click={() => controller.selectionMode = SelectionMode.Marking} class:active={controller.selectionMode === SelectionMode.Marking}><div></div></button>
		<button id="cross-button" class="mx-2" on:click={() => controller.selectionMode = SelectionMode.Crossing} class:active={controller.selectionMode === SelectionMode.Crossing}></button>
		<button on:click={submitSolution} class="ml-auto mr-16">Submit</button>
	</div>
</div>

<style lang="postcss">
	#game-container {
		@apply flex flex-col h-screen;
	}

	#game-footer > button {
		@apply bg-gray-300 border-gray-400 rounded-md text-lg p-4 h-full;
	}

	#mark-button, #cross-button {
		aspect-ratio: 1/1;
	}

	#game-footer > button.active {
		@apply bg-red-400;
	}

	#mark-button > div {
		width: 100%;
		height: 100%;
		background-image: url("pencil-pictogram.svg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	#cross-button {
		background-image: url("crossmark.svg");
		background-position: center;
		background-repeat: no-repeat;
	}
</style>