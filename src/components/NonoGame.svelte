<script>
import { Grid, GameController } from "/src/Game";

import NonoGrid from "./NonoGrid.svelte";

let gameController = new GameController();

gameController.startNewGrid()

</script>

<h1>NonoGame</h1>

<NonoGrid controller={gameController} grid={gameController.grid.grid} />