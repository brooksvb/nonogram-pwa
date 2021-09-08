<script>
import { GameController } from "/src/Game";

import NonoGrid from "./NonoGrid.svelte";
import { gridStore } from "/src/stores";

let gameController = new GameController();

gameController.startNewGrid()

</script>

<h1>NonoGame</h1>
<button on:click={() => gameController.startNewGrid()}>New Grid</button>

<NonoGrid controller={gameController} grid={$gridStore} />