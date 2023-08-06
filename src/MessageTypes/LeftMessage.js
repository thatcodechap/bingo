import Message from "./Message.js";
export default class ReadyMessage extends Message{
    constructor(player){
        super('left', {player: player.id});
    }
}