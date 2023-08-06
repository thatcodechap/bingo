import Event from "./Event";
export default class StartEvent extends Event{
    constructor(data){
        super('start', data);
    }
}