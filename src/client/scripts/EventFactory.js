import RequestEvent from "./EventTypes/RequestEvent"
import StartEvent from "./EventTypes/StartEvent"
import ReadyEvent from "./EventTypes/ReadyEvent"
import ChoiceEvent from "./EventTypes/ChoiceEvent"
import CompletedEvent from "./EventTypes/CompletedEvent"
import { sendEvent } from "./socketHander"

const EventFactory = {
    session :undefined,
    player : undefined,
    playerBound: false,
    create(eventname, data){
        data = this.embedSessionAndPlayer(data);
        let event;
        if(eventname == 'request')
            event = new RequestEvent(data);
        else if(eventname == 'start')
            event = new StartEvent(data);
        else if(eventname == 'ready')
            event = new ReadyEvent(data);
        else if(eventname == 'choice')
            event = new ChoiceEvent(data);
        else if(eventname == 'completed')
            event = new CompletedEvent(data);
        sendEvent(event);
    },
    bindSession(session){
        this.session = session;
    },
    bindPlayer(player){
        this.player = player;
        this.playerBound = true;
    },
    embedSessionAndPlayer(data){
        data = data || {};
        data.session = this.session;
        if(this.playerBound)
            data.from = this.player;
        return data
    }
}

export default EventFactory;