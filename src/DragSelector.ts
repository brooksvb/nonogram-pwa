import { currentSelectionStore } from "./stores";
import { get as get_store_value } from 'svelte/store';
import type { GameController, GridCoords, GridSelection } from "./Game";

/**
 * Contains logic for watching mouse and touch events and calculating the selection
 */
 export class DragSelector {
    
    private initialCoords: GridCoords | null = null;
    private endCoords: GridCoords | null = null;

    public valid = false;

    constructor(private controller: GameController) {
        //
        this.onMouseDown.bind(this);
        this.onMouseMove.bind(this);
        this.onMouseUp.bind(this);
    }

    private updateSelection() {
        const currentSelection = this.getGridSelection();
        if (get_store_value(currentSelectionStore) !== currentSelection) {
            currentSelectionStore.set(currentSelection);
        }
    }

    /**
     * A valid selection must be in one row or column
     */
    public isValidSelection(): boolean {
        if (this.initialCoords === null || this.endCoords === null) return false; 
        return this.initialCoords.x === this.endCoords.x || this.initialCoords.y === this.endCoords.y;
    }

    public getGridSelection(): GridSelection|null {
        if (this.initialCoords === null) {
            return null;
        }
        return {
            startCoord: this.initialCoords,
            endCoord: this.endCoords,
            valid: this.isValidSelection()
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

    private resetSelection() {
        this.valid = false;
        this.initialCoords = null;
        this.endCoords = null;
        this.updateSelection();
    }

     onMouseDown = (e: MouseEvent): void => {
        this.initialCoords = this.getGridCoordsFromScreenCoords(e.x, e.y);
        this.endCoords = this.initialCoords;
        this.updateSelection();

        // Listen to events until selection done
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = (e: MouseEvent): void => {
        this.endCoords = this.getGridCoordsFromScreenCoords(e.x, e.y);
        this.valid = this.isValidSelection();
        this.updateSelection();
    };

    onMouseUp = (e: MouseEvent): void => {
        console.log(this.initialCoords, this.endCoords);
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
        
        if (this.isValidSelection()) {
            this.controller.applySelection(this.getGridSelection());
        }

        this.resetSelection();
    };

    onTouchStart = (e: TouchEvent): void => {
        this.initialCoords = this.getGridCoordsFromScreenCoords(e.touches[0].pageX, e.touches[0].pageY);
        this.endCoords = this.initialCoords;
        this.updateSelection();

        document.addEventListener('touchmove', this.onTouchMove);
        document.addEventListener('touchend', this.onTouchEnd);
    };
    
    onTouchMove = (e: TouchEvent): void => {
        this.endCoords = this.getGridCoordsFromScreenCoords(e.touches[0].pageX, e.touches[0].pageY);
        this.valid = this.isValidSelection();
        this.updateSelection();
    };

    onTouchEnd = (e: TouchEvent): void => {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);

        if (this.isValidSelection()) {
            this.controller.applySelection(this.getGridSelection());
        }

        this.resetSelection();
    };

    // onTouchEnd
}