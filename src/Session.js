import { generateRandomString, LinkedHashmap } from "./utils.js";

export default class Session{
    id = generateRandomString(3);
    players = new LinkedHashmap();
    nextPlayer;
    playerCount = 0;
    readyCount = 0;
    status = 'waiting';
    controller;
    addPlayer(newPlayer){
        this.players.insert(newPlayer);
        if(this.nextPlayer == undefined){
            this.nextPlayer = newPlayer;
            this.controller = newPlayer;
        }
        this.playerCount += 1;
    }
    removePlayer(player){
        if(this.nextPlayer == player)
            this.nextPlayer = this.players.nextItem(player);
        if(this.controller == player)
            this.controller = this.players.nextItem(player);
        this.players.delete(player);
        this.playerCount -= 1;
    }
    getPlayer(playerId){ return this.players.find(playerId); }
    getPlayerAll(){ return this.players.inArray(); }
    updateNextPlayer(){ this.nextPlayer = this.players.nextItem(this.nextPlayer); }
    broadcast(sourcePlayer,message){
        this.players.inArray().forEach(player=>{
            if(player != sourcePlayer)
                player.sendMessage(message);
        })
    }
    reset(){
        this.players = new LinkedHashmap();
        this.playerCount = 0;
        this.readyCount = 0;
        this.status = 'waiting';
        this.nextPlayer = undefined;
    }
}