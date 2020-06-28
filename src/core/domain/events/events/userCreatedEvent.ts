import DumbbellEvent from "../../../../core/domain/events/events/dumbbellEvent";

export default class UserCreatedEvent extends DumbbellEvent {
    constructor(
        public readonly email: string,
        public readonly username: string,
        public readonly role: string
    ) { super(); }
}