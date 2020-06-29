import EventBus from "../../../core/domain/events/eventBus";
import UserCreatedEvent from "../../../core/domain/events/events/userCreatedEvent";
import { Subscriber } from "../../../core/domain/events/subscriber";
import { ExerciseUserRepository } from "../domain/repositories/exerciseUserRepository";
import User from "../domain/aggregates/user";

export default class UserCreatedSubscriber {
    constructor(
        private eventBus: EventBus,
        private userRepository: ExerciseUserRepository
    ) {
        eventBus.subscribe(UserCreatedEvent.name, this.onUserCreated.bind(this) as Subscriber);
    }

    private onUserCreated(event: UserCreatedEvent) {
        const user = new User(event.username, event.role);
        this.userRepository.create(user);
    }
}