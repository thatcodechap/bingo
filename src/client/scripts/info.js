import { grid } from "./components";
const TILES = 25;
const WIDTH = Math.sqrt(TILES);
let GRID_WIDTH;
let TILE_WIDTH;
let GAP;
let OFFSET;

export function initInfo(){
    TILE_WIDTH = document.querySelector('.tile').clientWidth;
    GRID_WIDTH = grid.clientWidth;
    GAP = (GRID_WIDTH - (WIDTH*TILE_WIDTH))/(WIDTH - 1);
    OFFSET = TILE_WIDTH/2;
}
export {grid, GRID_WIDTH, TILE_WIDTH, GAP, OFFSET, TILES, WIDTH};