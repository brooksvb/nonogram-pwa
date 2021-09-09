import { currentSelectionStore, gridStore } from "./stores";
import { get as get_store_value } from 'svelte/store';

/**
 * The GridData matrix has it's origin on the bottom left. First coordinate (x) refers to the column, 
 * second coordinate (y) refers to row. 
 */
export type GridData = GridCell[][];

export interface GridCell {
    state: CellState, // Empty, marked, X'ed
    target: boolean, // Solution state of cell
    x: number, // Coords in the grid
    y: number
}

export type GridCoords = {
    x: number,
    y: number
}

export enum CellState {
    Empty, // Cell is empty
    Marked, // Cell is marked
    Crossed // Cell is marked with an X (only a visual, does not affect solution-checking)
}

export enum SelectionMode {
    Marking,
    Crossing
}


export class GameController {

    public selectionMode: SelectionMode = SelectionMode.Marking;

    public startNewGrid(): void {
        gridStore.set(GridHelper.generateGrid(10, 10));
    }

    public applySelection(selection: GridSelection): void {
        const currentGrid = get_store_value(gridStore);
        /**
         * If initial cell was empty, apply the mode indicated by selectionMode
         * If initial cell was marked, unmark marked cells in selection
         * If initial cell was crossed, uncross cells in selection
         */
        const firstCell = currentGrid[selection.startCoord.x][selection.startCoord.y];
        let targetState: CellState;
        switch (firstCell.state) {
            case CellState.Marked:
                targetState = CellState.Empty;
                break;
            case CellState.Crossed:
                targetState = CellState.Empty;
                break;
            case CellState.Empty:
                if (this.selectionMode === SelectionMode.Marking) {
                    targetState = CellState.Marked;
                } else if (this.selectionMode === SelectionMode.Crossing) {
                    targetState = CellState.Crossed;
                }
                break;
        }

        // TODO: Check for invalid moves if strict mode is on

        // Do some logic work to make it easier to iterate through cells in correct direction
        let direction = '';
        let bottomBound: number;
        let upperBound: number;
        if (selection.startCoord.x === selection.endCoord.x) {
            direction = 'col';
            // Put the lower index in bottomBound
            if (selection.startCoord.y > selection.endCoord.y) {
                bottomBound = selection.endCoord.y;
                upperBound = selection.startCoord.y;
            } else {
                bottomBound = selection.startCoord.y;
                upperBound = selection.endCoord.y;
            }
        }
        else if (selection.startCoord.y === selection.endCoord.y) {
            direction = 'row';
            if (selection.startCoord.x > selection.endCoord.x) {
                bottomBound = selection.endCoord.x;
                upperBound = selection.startCoord.x;
            } else {
                bottomBound = selection.startCoord.x;
                upperBound = selection.endCoord.x;
            }
        }

        const newGrid = currentGrid.map(col => {
            return col.map(cell => {
                const newCell = { ...cell };
                // In all cases, if cell is not same state as first cell, ignore it
                if (cell.state !== firstCell.state) return newCell;

                // If in same column and within bounds
                if (direction === 'col' && cell.x === selection.startCoord.x && cell.y >= bottomBound && cell.y <= upperBound) {
                    newCell.state = targetState;
                    return newCell;
                } 
                // If in same row and within bounds
                else if (direction === 'row' && cell.y === selection.startCoord.y && cell.x >= bottomBound && cell.x <= upperBound) {
                    newCell.state = targetState
                    return newCell;
                } else {
                    return newCell;
                }
            });
        });
        gridStore.set(newGrid);
    }

}

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
        return groups;
    }

    public static getColGroups(col: number): number[] {
        const grid = get_store_value(gridStore);
        const groups = [];
        let counter = 0;
        for (let i = 0; i < grid[0].length; i++) {
            if (grid[col][i].target) {
                counter++;
            } else if (counter !== 0) {
                // Add the group number and restart count
                groups.push(counter);
                counter = 0;
            }
        }
        return groups;
    }
}

export interface GridSelection {
    startCoord: {
        x: number,
        y: number
    },
    endCoord: {
        x: number,
        y: number
    },
    valid: boolean
}

