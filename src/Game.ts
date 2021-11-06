import { gridStore, timerStore } from "./stores";
import { get as get_store_value } from 'svelte/store';
import { GridHelper } from "./GridHelper";

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

export class GameController {

    private rows = 5;
    private cols = 5;

    public getRows(): number { return this.rows; }
    public getCols(): number { return this.cols; }

    public selectionMode: SelectionMode = SelectionMode.Marking;

    private timerId = null;

    public startNewGrid(width = 5, height = 5): void {
        // Store size of last grid so it can be accessed in NonoGrid
        this.rows = height;
        this.cols = width;
        gridStore.set(GridHelper.generateGrid(width, height));
    }

    public startTimer(): void {
        this.timerId = setInterval(() => {
            const seconds = get_store_value(timerStore);
            timerStore.set(seconds + 1);
        }, 1000);
    }

    public stopTimer(): void {
        clearInterval(this.timerId);
        this.timerId = null;
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

    public solutionIsValid(): boolean {
        // Check if solution is correct
        const grid = get_store_value(gridStore);
        let hasError = false;
        hasError = grid.reduce((hasError, col) => {
            if (hasError) return true;
            return col.reduce((hasError, cell) => {
                if (hasError) return true;
                // If target, just check if marked. Else, anything not marked is okay
                // In paren is good conditions, negate for return
                return !(cell.target === true ? cell.state === CellState.Marked : cell.state !== CellState.Marked);
            }, hasError);
        }, hasError);

        return !hasError;
    }
}
