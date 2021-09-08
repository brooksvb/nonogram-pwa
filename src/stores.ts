import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { GridCell, GridData } from './Game';

export let gridStore: Writable<GridData> = writable(new Array<Array<GridCell>>());
