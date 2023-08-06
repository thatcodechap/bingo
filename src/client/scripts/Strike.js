import { GRID_WIDTH } from "./info";

export function createRowStrike(position){
    let strike = document.createElement('div');
    strike.className = 'row-strike';
    strike.style.setProperty('top', `${position}px`);
    strike.style.setProperty('width', `${GRID_WIDTH}px`)
    return strike;
}
export function createColumnStrike(position){
    let strike = document.createElement('div');
    strike.className = 'column-strike';
    strike.style.setProperty('left', `${position}px`);
    strike.style.setProperty('height', `${GRID_WIDTH}px`)
    return strike;
}
export function createDiagonalStrike(rotationInDegrees){
    let adjustmentLayer = document.createElement('div');
    let diagonalLength = Math.floor(Math.sqrt(2*Math.pow(GRID_WIDTH,2)));
    let topOffset = (GRID_WIDTH - diagonalLength)/2;
    adjustmentLayer.style.setProperty('transform', `rotate(${rotationInDegrees}deg)`);
    adjustmentLayer.style.setProperty('position','absolute');
    adjustmentLayer.style.setProperty('left', `${GRID_WIDTH/2}px`);
    adjustmentLayer.style.setProperty('top', `${topOffset}px`);
    let strike = document.createElement('div');
    strike.className = 'diagonal-strike';
    strike.style.setProperty('height', `${diagonalLength}px`);
    adjustmentLayer.appendChild(strike);
    return [adjustmentLayer, strike];
}