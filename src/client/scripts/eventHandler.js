import EventFactory from "./EventFactory"
import {isHidden, show, hide, random, attributeSelector} from "./utils.js"
import { createPlayerCard, updatePlayerCard } from "./PlayerCard";
import { checkAndUpdateGrid } from "./gameLogic";
import { initInfo , TILES} from "./info";
import { shareScreen , randomButton, userGrid, playerCards, playButton, tiles, body, endScreen, winnerText} from "./components";
import createTile from "./Tile";

randomButton.addEventListener('click', randomFill);
playButton.addEventListener('click', commandStart);

let fillCount = 0;
let myTurn = false;

const eventListener = {
    approved: initGame,
    joined: addNewPlayer,
    allready: promptStart,
    start: startGame,
    ready: updatePlayer,
    turn: setTurn,
    choice: handleChoice,
    left: removePlayer,
    completed: endGame,
    rejected: handleRejection,
}

function initGame({data}){
    EventFactory.bindPlayer(data.assignedId);
    drawGrid();
    addPlayers(data.existingPlayers);
    show(randomButton);
    initInfo();
    if(data.existingPlayers.length == 0)
        show(shareScreen);
}

function drawGrid(){
    for(let i = 0; i< TILES; i++){
        let tile = createTile(fillAndRemoveListener);
        tile.setAttribute('data-index',i);
        grid.appendChild(tile);
    }
}

function fillAndRemoveListener({target}){
    fillCount++;
    target.innerText = fillCount;
    target.setAttribute('data-value', fillCount);
    target.removeEventListener('click', fillAndRemoveListener);
    checkCountAndNotify();
}

function checkCountAndNotify(){
    if(fillCount == 25){
        EventFactory.create('ready');
        if(isHidden(randomButton) == false)
            hide(randomButton);
    }
}

function addNewPlayer({data}){
    addPlayers([data.joinedPlayer]);
    if(isHidden(playButton) == false)
        hide(playButton);
}

function addPlayers(players){
    players.forEach(player=>{
        userGrid.appendChild(createPlayerCard(player));
    })
}

function promptStart(){
    show(playButton);
}

function startGame(){
    tiles.forEach(tile=>{
        tile.addEventListener('click', choose);
    });
    playerCards.forEach(playerCard=>updatePlayerCard(playerCard, 'in-game'));
}


function choose({target}){
    if(myTurn){
        let choice = target.getAttribute('data-value');
        EventFactory.create('choice', {choice: choice});
        target.classList.add('chosen');
        target.removeEventListener('click', choose);
        myTurn = false;
        checkAndUpdateGrid(target);
        body.classList.remove('turn');
    }
}

function handleChoice({data}){
    let tile = attributeSelector('.tile', {'data-value': data.choice});
    tile.classList.add('chosen');
    tile.removeEventListener('click', choose);
    checkAndUpdateGrid(tile);
}

function updatePlayer({data}){
    let playerCard = attributeSelector('div', {'data-id': data.player});
    updatePlayerCard(playerCard, 'ready');
}

function removePlayer({data}){
    let playerCard = attributeSelector('.playerCard', {'data-id': data.player});
    if(playerCard)
        playerCard.remove();
}

function endGame({data}){
    winnerText.innerText = data.winner.name;
    show(endScreen);
}

function setTurn(){
    myTurn = true;
    body.classList.add('turn');
}

function handleRejection({data}){
    document.location = document.location.protocol + '//' + document.location.host + `/error?message=${data.message}`
}

function commandStart(){
    EventFactory.create('start');
    startGame();
    setTurn();
    hide(playButton);
}

function randomFill(){
    let tilesInArray = Array.from(tiles);
    for(let i = TILES-1;i >= 0;i--){
        let j = random(0, i);
        let temp = tilesInArray[j];
        tilesInArray[j] = tilesInArray[i];
        tilesInArray[i] = temp;
        if(tilesInArray[i].innerText == '')
            fillAndRemoveListener({target: tilesInArray[i]})
    }
    hide(randomButton);
}

export default eventListener;