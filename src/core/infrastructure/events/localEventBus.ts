import EventBus from "../../domain/events/eventBus";
import DumbbellEvent from "../../domain/events/dumbbellEvent";
import { Subscriber } from "../../domain/events/subscriber";

export default class LocalEventBus implements EventBus {
    private receivers: {
        [key: string]: Subscriber[]
    }

    constructor() {
        this.receivers = {}
    }

    publish(event: DumbbellEvent): void {
        if (this.receivers[event.constructor.name] != null){
            this.receivers[event.constructor.name].map(receiver => receiver(event));        
        }
    }

    subscribe(topic: string, event: Subscriber): void {
        if (this.receivers[topic] == null) {
            this.receivers[topic] = []
        }
        this.receivers[topic].push(event);
    }

}