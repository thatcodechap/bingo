import Message from "./Message.js";
export default class ChoiceMessage extends Message{
    constructor(choice){
        super('choice', {choice});
    }
}