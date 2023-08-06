import Session from "./Session.js"
const sessions = {};
const sessionHandler = {
    new(){
        let newSession = new Session();
        sessions[newSession.id] = newSession;
        return newSession;
    },
    find(id){
        return sessions[id];
    },
    getAll(){
        return sessions;
    }
}

export function destroyIfInactive(session){
    setTimeout(()=>{
        if(session.status == 'ended')
            delete sessions[session.id]
    },300000)
}

export default sessionHandler;