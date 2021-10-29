// Test Game.ts
import { GameController } from "../src/Game";
import { gridStore } from "../src/stores";
import { get as get_store_value } from 'svelte/store';

describe("test grid creation", () => {
	const controller = new GameController();

	it("creates 5x5 grid", () => {
		controller.startNewGrid(5, 5);

		const getGrid = get_store_value(gridStore);
		expect(getGrid.length).toBe(5);
		expect(getGrid[0].length).toBe(5);
	});
});