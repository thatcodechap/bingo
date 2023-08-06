import { MAX_PLAYERS } from './httpHandler.js';
import {ApprovalMessage, JoinedMessage,  ReadyMessage, StartMessage, ChoiceMessage, LeftMessage, CompletedMessage, AllReadyMessage, TurnMessage, RejectMessage} from './MessageTypes/AllMessageTypes.js'
import Player from "./Player.js";
import { destroyIfInactive } from './sessionHandler.js';

const eventListeners = {
    request : handleRequest,
    ready: playerReady,
    start: startGame,
    choice: validateChoice,
    disconnected: removePlayer,
    completed: endGame,
}

function handleRequest({session, socket, data}){
    if(session.playerCount == MAX_PLAYERS){
        socket.send(JSON.stringify(new RejectMessage("Max player limit reached")));
        return;
    }
    let existingPlayers = session.getPlayerAll();
    let newPlayer = new Player(socket, data.username);
    newPlayer.session = session;
    session.addPlayer(newPlayer);
    newPlayer.sendMessage(new ApprovalMessage(newPlayer, existingPlayers));
    session.broadcast(newPlayer, new JoinedMessage(newPlayer));
    socket.player = newPlayer;
}

function playerReady({session, from}){
    session.broadcast(from, new ReadyMessage(from));
    from.status = 'ready';
    session.readyCount += 1;
    checkAndNotifyController(session);
}

function checkAndNotifyController(session){
    if(session.readyCount == session.playerCount)
        session.controller.sendMessage(new AllReadyMessage());
}

function startGame({session, from}){
    session.broadcast(from, new StartMessage());
    session.status = 'ingame';
}

function validateChoice({session, from, data}){
    if(session.nextPlayer == from)
        session.broadcast(from, new ChoiceMessage(data.choice));
    session.updateNextPlayer();
    session.nextPlayer.sendMessage(new TurnMessage());
}

function removePlayer({socket}){
    if(socket.player == undefined)
        return;
    let session = socket.player.session;
    if(session.getPlayer(socket.player.id) == undefined)
        return;
    session.removePlayer(socket.player);
    session.broadcast(null, new LeftMessage(socket.player));
    if(session.status == 'ingame')
        session.nextPlayer.sendMessage(new TurnMessage());
    if(session.playerCount == 0){
        session.status = 'ended'
        destroyIfInactive(session);
    }
        
}

function endGame({session, from}){
    session.broadcast(from, new CompletedMessage(from));
    session.status = 'ended';
    destroyIfInactive(session);
}

export default eventListeners;