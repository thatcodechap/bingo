import eventListener from "./eventHandler";
import EventFactory from "./EventFactory";

let webSocket;
export function initWebSocket(wsAddress, username){
    webSocket = new WebSocket(wsAddress);
    webSocket.addEventListener('open', ()=>{
        EventFactory.create('request', {username: username});
    });
    webSocket.addEventListener('message',(rawMessage)=>{
        let message = JSON.parse(rawMessage.data);
        eventListener[message.event](message);
    });
}

export function sendEvent(event){
    webSocket.send(JSON.stringify(event));
}