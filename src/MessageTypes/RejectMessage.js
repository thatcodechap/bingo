import Message from "./Message.js";
export default class RejectMessage extends Message{
    constructor(message){
        super('rejected', {message: message});
    }
}