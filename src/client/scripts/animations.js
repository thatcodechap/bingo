import { TILE_WIDTH, GAP, OFFSET, grid } from './info.js'
import { createRowStrike, createColumnStrike,createDiagonalStrike} from "./Strike";

export function strikeRow(row){
    let strikePosition = (row*TILE_WIDTH) + (row*GAP) + OFFSET;
    let newStrike = createRowStrike(strikePosition);
    grid.append(newStrike);
    newStrike.animate(rowKeyframes, effect);
}
export function strikeColumn(column){
    let strikePosition = (column*TILE_WIDTH) + (column*GAP) + OFFSET;
    let newStrike = createColumnStrike(strikePosition);
    grid.append(newStrike);
    newStrike.animate(columnKeyframes, effect);
}
export function strikeDiagonal(diagonal){
    let rotationInDegrees;
    if(diagonal == 0)
        rotationInDegrees = -45;
    else
        rotationInDegrees = 45;
    let [adjustmentLayer,strike] = createDiagonalStrike(rotationInDegrees);
    grid.append(adjustmentLayer);
    strike.animate(columnKeyframes, effect);
}

const rowKeyframes = [
    {transform: 'scaleX(0)'},
    {transform: 'scaleX(1)'}
];
const columnKeyframes = [
    {transform: 'scaleY(0)'},
    {transform: 'scaleY(1)'}
];
const effect = {
    duration: 500,
    easing: 'ease-out',
}