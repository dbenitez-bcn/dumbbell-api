import UserCreatedSubscriber from "./userCreatedSubscriber";
import UserCreatedEvent from "../../../core/domain/events/events/userCreatedEvent";
import { getFakeEventBus } from "../test/testUtils";
import { ExerciseUserRepository } from "../domain/repositories/exerciseUserRepository";
import User from "../domain/aggregates/user";

describe("userCreatedSubscriber", () => {
    const AN_EMAIL = "test@dumbbell.com";
    const A_USERNAME = "username";
    const A_USER_ROLE = "user";
    
    test("When UserCreatedEvent is fired should trigger the method", () => {
        const userRepository = {
            create: jest.fn()
        } as ExerciseUserRepository
        const evenBus = getFakeEventBus();
        const event = new UserCreatedEvent(AN_EMAIL, A_USERNAME, A_USER_ROLE);
        const expectedUser = new User(A_USERNAME, A_USER_ROLE);
        new UserCreatedSubscriber(evenBus, userRepository);
        
        evenBus.publish(event);

        expect(userRepository.create).toBeCalledWith(expectedUser);
    })
})