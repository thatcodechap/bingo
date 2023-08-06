import Event from "./Event";
export default class RequestEvent extends Event{
    constructor(data){
        super('request', data);
    }
}