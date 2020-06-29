import EventBus from "../../../core/domain/events/eventBus";
import { Subscriber } from "../../../core/domain/events/subscriber";
import DumbbellEvent from "../../../core/domain/events/events/dumbbellEvent";

export const getFakeEventBus = () => {
    return new FakeEventBus();
}

class FakeEventBus implements EventBus {
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