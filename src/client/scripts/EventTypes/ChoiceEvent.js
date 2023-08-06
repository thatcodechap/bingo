import Event from "./Event";
export default class ChoiceEvent extends Event{
    constructor(data){
        super('choice', data);
    }
}