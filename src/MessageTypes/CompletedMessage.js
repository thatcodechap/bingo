import Message from "./Message.js";
export default class CompletedMessage extends Message{
    constructor(winner){
        super('completed', {winner: {id: winner.id, name: winner.name}});
    }
}