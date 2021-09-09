<script>
import { GameController } from "/src/Game";

import NonoGrid from "./NonoGrid.svelte";
import { gridStore } from "/src/stores";
import { SelectionMode } from "/src/Game";
import GameTimer from "./GameTimer.svelte";
import PauseButton from "./PauseButton.svelte";

let controller = new GameController();

controller.startNewGrid()
</script>

<!-- <button on:click={() => controller.startNewGrid()}>New Grid</button> -->

<div class="game-container">
	<div class="game-header">
		<GameTimer />
		<PauseButton />
	</div>

	<NonoGrid controller={controller} />

	<div class="game-footer">
		<button on:click={() => controller.selectionMode = SelectionMode.Marking} class:active={controller.selectionMode === SelectionMode.Marking}>Mark</button>
		<button on:click={() => controller.selectionMode = SelectionMode.Crossing} class:active={controller.selectionMode === SelectionMode.Crossing}>Cross</button>
		<button on:click={() => controller.submitSolution()}>Submit</button>
	</div>
</div>

<style>
	.game-container {
		display: grid;
		grid-template-rows: 1fr 4fr 1fr;
		max-height: 100vh
	}

	.game-header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.game-footer {

	}
</style>