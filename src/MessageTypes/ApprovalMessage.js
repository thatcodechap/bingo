import Message from "./Message.js";
import { formatPlayers } from "../utils.js";
export default class ApprovalMessage extends Message{
    constructor(newPlayer, existingPlayers){
        super('approved', {assignedId: newPlayer.id, existingPlayers: formatPlayers(existingPlayers)});
    }
}