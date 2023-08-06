import { generateRandomString } from "./utils.js";
export default class Player{
    constructor(socket, name){
        this.socket = socket;
        this.name = name;
    }

    id = generateRandomString(3);
    name;
    status = 'Filling';
    socket;
    next;
    prev;
    session;

    sendMessage(messageObject){
        this.socket.send(JSON.stringify(messageObject));
    }
}