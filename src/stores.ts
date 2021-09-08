import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { GridCell, GridData, GridSelection } from './Game';

export const gridStore: Writable<GridData> = writable(new Array<Array<GridCell>>());

export const currentSelectionStore: Writable<GridSelection | null> = writable(null);