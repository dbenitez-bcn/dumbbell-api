import FakeEvent from "../../test/fakeEvent";
import { Subscriber } from "../../domain/events/subscriber";
import DumbbellEvent from "../../domain/events/events/dumbbellEvent";
jest.mock('inversify', () => ({
    injectable: jest.fn()
}));
import LocalEventBus from "./localEventBus";

describe('localEventBus', () => {
    test('Given an event emited should execute the subscribed methods', () => {
        const sut = new LocalEventBus();
        const subscriber = jest.fn() as Subscriber;
        const event = new FakeEvent();

        sut.subscribe(FakeEvent.name, subscriber);
        sut.publish(event);

        expect(subscriber).toBeCalled();
    });
    test('Given an event emited When no subscriber are subscribed should execute the subscribed methods', () => {
        const sut = new LocalEventBus();
        const subscriber = jest.fn() as Subscriber;
        const dumbbellEvent = new DumbbellEvent();

        sut.subscribe(FakeEvent.name, subscriber);
        sut.publish(dumbbellEvent);

        expect(subscriber).not.toBeCalled();
    });

    test('Given an event emited should trigger the subscriber', () => {
        const sut = new LocalEventBus();
        let isSubscriberTrigged = false;
        const subscriber = (event: FakeEvent) => {
            isSubscriberTrigged = true;
        };

        sut.subscribe(FakeEvent.name, subscriber);
        sut.publish(new FakeEvent);

        expect(isSubscriberTrigged).toBe(true);
    })
})