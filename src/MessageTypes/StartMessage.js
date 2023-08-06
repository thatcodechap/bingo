import Message from "./Message.js";
export default class StartMessage extends Message{
    constructor(){
        super('start', {});
    }
}