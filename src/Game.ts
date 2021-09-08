/**
 * The GridData matrix has it's origin on the bottom left. First coordinate (x) refers to the column, 
 * second coordinate (y) refers to row. 
 */
export type GridData = GridCell[][];

export interface GridCell {
    state: CellState, // Empty, marked, X'ed
    target: boolean, // Solution state of cell
    selection: boolean, // Is part of current drag-selection
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
    public grid: Grid;

    public selectionMode: SelectionMode = SelectionMode.Marking;

    public startNewGrid(): void {
        this.grid = new Grid(10, 10);
        gridStore.set(this.grid.grid);
    }

    public getGridData(): GridData {
        return this.grid.grid;
    }

    public applySelection(selection: GridSelection): void {
        /**
         * If initial cell was empty, and selection includes marked cells, mark empty cells in selection
         * If initial cell was marked, unmark marked cells in selection
         * If initial cell was flagged, unflag cells in selection
         */
        const firstCell = this.grid.grid[selection.startCoord.x][selection.startCoord.y];
        let targetState: CellState;
        // TODO: Make dependent on selectionMode
        switch (firstCell.state) {
            case CellState.Marked:
                targetState = CellState.Empty;
                break;
            case CellState.Crossed:
                targetState = CellState.Empty;
                break;
            case CellState.Empty:
                targetState = CellState.Marked;
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

        // Iterate through selection to update state
        // Note that we include the upperBound in this iteration
        for (let i = bottomBound; i <= upperBound; i++) {
            if (direction === 'col') {
                this.grid.grid[selection.startCoord.x][i].state = targetState;
            } else {
                this.grid.grid[i][selection.startCoord.y].state = targetState;
            }
        }
        console.log(this.grid.grid);
        // TODO: 
    }

}

export class Grid {
    public grid: GridData;

    constructor(public readonly width: number, public readonly height: number) {
        this.grid = this.generateGrid(width, height);
    }

    private generateGrid(width: number, height: number): GridData {
        // Initializing typed multidim. array: https://stackoverflow.com/a/47801159/5869958
        const grid = new Array<Array<GridCell>>();
        for (let x = 0; x < width; x++) {
            const col: GridCell[] = new Array<GridCell>();
            for (let y = 0; y < height; y++) {
                col[y] = {
                    state: CellState.Empty,
                    target: false, // Solution state of cell
                    selection: false,
                    x: x,
                    y: y
                };
            }
            grid.push(col);
        }
        return grid;
    }

    public getCell(x: number, y: number): GridCell {
        // TODO: Check if out of bounds
        return this.grid[x][y];
    }

    /**
     * 
     * @param row 
     * @returns array of numbers representing groups in the row
     */
    public getRowGroups(row: number): number[] {
        const groups = [];
        let counter = 0;
        for (let i = 0; i < this.height; i++) {
            if (this.grid[i][row].target) {
                counter++;
            } else if (counter !== 0) {
                // Add the group number and restart count
                groups.push(counter);
                counter = 0;
            }
        }
        return groups;
    }

    public getColGroups(col: number): number[] {
        const groups = [];
        let counter = 0;
        for (let i = 0; i < this.width; i++) {
            if (this.grid[col][i].target) {
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
    }
}

/**
 * Contains logic for watching mouse and touch events and calculating the selection
 */
export class DragSelector {
    
    private initialCoords: GridCoords | null = null;
    private endCoords: GridCoords | null = null;

    public valid = false;

    constructor(private grid: Grid, private controller: GameController) {
        //
        this.onMouseDown.bind(this);
        this.onMouseMove.bind(this);
        this.onMouseUp.bind(this);
    }

    // TODO: add touch events
    onMouseDown = (e: MouseEvent): void => {
        this.initialCoords = this.getGridCoordsFromScreenCoords(e.x, e.y);
        this.endCoords = this.initialCoords;
        // console.log(this.initialCoords);

        // Listen to events until selection done
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = (e: MouseEvent): void => {
        this.endCoords = this.getGridCoordsFromScreenCoords(e.x, e.y);
        this.valid = this.isValidSelection();
        // console.log(e.x, e.y, this.valid);

        // Visual feedback for selection
        
    }

    onMouseUp = (e: MouseEvent): void => {
        console.log(this.initialCoords, this.endCoords);
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)

        if (this.isValidSelection()) {
            this.controller.applySelection(this.getGridSelection());
        }

        this.valid = false;
        this.initialCoords = null;
        this.endCoords = null;
    }

    /**
     * A valid selection must be in one row or column
     */
    public isValidSelection(): boolean {
        if (this.initialCoords === null || this.endCoords === null) return false; 
        return this.initialCoords.x === this.endCoords.x || this.initialCoords.y === this.endCoords.y;
    }

    public getGridSelection(): GridSelection {
        return {
            startCoord: this.initialCoords,
            endCoord: this.endCoords
        }
    }

    private getGridCoordsFromScreenCoords(x: number, y: number): GridCoords {
        const element = document.elementFromPoint(x, y);
        const gridX = parseInt(element.getAttribute('data-x'));
        const gridY = parseInt(element.getAttribute('data-y'));
        return {
            x: gridX,
            y: gridY
        }
    }

}