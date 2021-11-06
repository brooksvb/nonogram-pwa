import type { GridData, GridCell, GridSelection } from './Game';
import { CellState } from './Game';
import { get as get_store_value } from 'svelte/store';
import { gridStore } from "./stores";

export class GridHelper {

    public static generateGrid(width: number, height: number): GridData {
        // Initializing typed multidim. array: https://stackoverflow.com/a/47801159/5869958
        const grid = new Array<Array<GridCell>>();
        for (let x = 0; x < width; x++) {
            const col: GridCell[] = new Array<GridCell>();
            for (let y = 0; y < height; y++) {
                const isTarget = Math.random() >= .5;
                col[y] = {
                    state: CellState.Empty,
                    target: isTarget, // Solution state of cell
                    x: x,
                    y: y
                };
            }
            grid.push(col);
        }
        return grid;
    }

    public static coordsAreInSelection(x: number, y: number, selection: GridSelection): boolean {
        const [lowerX, upperX] = selection.startCoord.x > selection.endCoord.x 
        ? [selection.endCoord.x, selection.startCoord.x] 
        : [selection.startCoord.x, selection.endCoord.x];
        const [lowerY, upperY] = selection.startCoord.y > selection.endCoord.y
        ? [selection.endCoord.y, selection.startCoord.y] 
        : [selection.startCoord.y, selection.endCoord.y];
        
        return x >= lowerX && x <= upperX && y >= lowerY && y <= upperY;
    }

    /**
     * 
     * @param row 
     * @returns array of numbers representing groups in the row
     */
    public static getRowGroups(row: number): number[] {
        const grid = get_store_value(gridStore);
        const groups = [];
        let counter = 0;
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][row].target) {
                counter++;
            } else if (counter !== 0) {
                // Add the group number and restart count
                groups.push(counter);
                counter = 0;
            }
        }
        if (counter !== 0) {
            groups.push(counter);
        }
        return groups;
    }

    public static getColGroups(col: number): number[] {
        const grid = get_store_value(gridStore);
        const groups = [];
        let counter = 0;
        // Iterate backwards because headings read top-down
        for (let i = grid[0].length - 1; i >= 0; i--) {
            if (grid[col][i].target) {
                counter++;
            } else if (counter !== 0) {
                // Add the group number and restart count
                groups.push(counter);
                counter = 0;
            }
        }
        if (counter !== 0) {
            groups.push(counter);
        }
        return groups;
    }

    public static printGridSolution(): void {
        const grid = get_store_value(gridStore); 
        let solution = '';
        for (let y = grid[0].length - 1; y >= 0; y--) {
            for (let x = 0; x < grid.length; x++) {
                solution += grid[x][y].target ? 'X ' : 'o ';
            }
            solution += '\n';
        }
        console.log(solution);
    };
}
