import DumbbellEvent from "./events/dumbbellEvent";
import { Subscriber } from "./subscriber";

export default interface EventBus {
    publish(event: DumbbellEvent): void
    subscribe(topic: string, event: Subscriber): void
}