import Event from "./Event";
export default class CompletedEvent extends Event{
    constructor(data){
        super('completed', data);
    }
}