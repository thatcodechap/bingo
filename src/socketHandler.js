import eventListeners from "./eventHandler.js";
import Event from "./Event.js";

export default function socketHandler(websocket){
    websocket.on('message', messageHandler);
    websocket.on('close', close);
}

function messageHandler(rawMessage){
    let message = JSON.parse(rawMessage);
    let event = new Event(message, this);
    eventListeners[event.name](event);
}
function close(){
    eventListeners['disconnected']({socket: this});
}