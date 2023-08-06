import Message from "./Message.js";
export default class TurnMessage extends Message{
    constructor(){
        super('turn', {});
    }
}