import Message from "./Message.js"
export default class JoinedMessage extends Message{
    constructor(newPlayer){
        super('joined', {
            joinedPlayer: {id: newPlayer.id, name: newPlayer.name, status: newPlayer.status},
        })
    }
}