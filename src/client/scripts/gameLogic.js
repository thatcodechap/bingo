import { WIDTH } from "./info.js";
import { strikeColumn, strikeRow, strikeDiagonal } from "./animations";
import EventFactory from "./EventFactory.js";
import { endScreen, winnerText } from "./components.js";
import { show } from "./utils.js";

let progress = {
    count: 0,
    rows: {},
    columns: {},
    diagonals: {'0': 0, '1': 0}
}

for(let i=0;i<WIDTH;i++){
    progress.rows[i] = 0;
    progress.columns[i] = 0;
}

export function checkAndUpdateGrid(tile){
    let tileIndex = parseInt(tile.getAttribute('data-index'));
    updateProgress(tileIndex);
    if(progress.count >= 5){
        winnerText.innerText = "You";
        show(endScreen);
        EventFactory.create('completed');
    }
}

function updateProgress(index){
    let row = Math.floor(index / WIDTH);
    let column = index % WIDTH;
    progress.rows[row] += 1;
    progress.columns[column] += 1;
    if(row == column)
        progress.diagonals[0] += 1;
    if(row + column == WIDTH - 1)
        progress.diagonals[1] += 1;
    updateCountAndAnimate();
}

function updateCountAndAnimate(){
    for(let i=0;i<WIDTH;i++){
        if(progress.rows[i] == WIDTH){
            strikeRow(i);
            delete progress.rows[i];
            progress.count += 1;
        }
        if(progress.columns[i] == WIDTH){
            strikeColumn(i);
            delete progress.columns[i];
            progress.count += 1;
        }
        if((i == 0 || i == 1) && progress.diagonals[i] == WIDTH){
            strikeDiagonal(i);
            delete progress.diagonals[i];
            progress.count += 1;
        }
    }
}