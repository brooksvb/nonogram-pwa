
export interface GridCell {
    state: CellState, // Empty, marked, X'ed
    target: boolean, // Solution state of cell
    selection: boolean, // Is part of current drag-selection
    x: number, // Coords in the grid
    y: number
}

export enum CellState {
    Empty, // Cell is empty
    Marked, // Cell is marked
    Crossed // Cell is marked with an X (only a visual, does not affect solution-checking)
}

export type GridData = GridCell[][];
export class NonoGame {
    public grid: Grid;

    public startNewGrid(): void {
        this.grid = new Grid(10, 10);
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