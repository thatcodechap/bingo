import { usernameOkButton, promptScreen, shareButton, shareCloseButton, shareCode, usernameInput, shareScreen } from "./components";
import EventFactory from "./EventFactory";
import { initWebSocket } from "./socketHander";
import { hide, show } from "./utils";

show(promptScreen);
const location = window.location;
const sessionId = location.pathname.substring(1);

EventFactory.bindSession(sessionId);

let username,wsAddress;

if(location.protocol == 'https:')
    wsAddress = 'wss://' + location.host
else
    wsAddress = 'ws://' + location.host

usernameOkButton.addEventListener('click', init);
function init(){
    username = usernameInput.value;
    if(username == '' || username.length < 5)
        return;
    initWebSocket(wsAddress, username);
    hide(promptScreen);
}

shareCode.innerText = `Code: ${sessionId}`;
shareButton.addEventListener('click', ({target})=>{
    navigator.clipboard.writeText(location);
    target.innerText = 'Copied';
    setTimeout(() => {
        target.innerText = 'Copy link';
    }, 500);
})
shareCloseButton.addEventListener('click', ()=>{
    hide(shareScreen);
})