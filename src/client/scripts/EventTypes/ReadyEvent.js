import Event from "./Event";
export default class ReadyEvent extends Event{
    constructor(data){
        super('ready', data);
    }
}