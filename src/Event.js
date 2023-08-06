import sessionHandler from "./sessionHandler.js";

export default class Event{
    constructor(eventMessage, fromSocket){
        this.name = eventMessage.event;
        this.socket = fromSocket;
        this.data = eventMessage.data;
        if(eventMessage.data.session)
            this.session = sessionHandler.find(eventMessage.data.session);
        if(eventMessage.data.from)
            this.from = this.session.getPlayer(eventMessage.data.from);
    }
    data;
    socket;
    session;
    name;
    from;
}