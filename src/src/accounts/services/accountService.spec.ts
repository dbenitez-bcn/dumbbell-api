import AccountService from "./accountService";
import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";

describe('Account service', () => {
    const A_USERNAME = 'testerino';
    const AN_EMAIL = 'testerino@dumbbell.com';
    const A_PASSWORD = 'password1234';
    const register = jest.fn();
    const repository: UserRepository = {
        register
    }
    const sut = new AccountService(repository);
    describe('Register', () => {
        test('Should register a new user', async () => {
            const expected = new User(A_USERNAME, AN_EMAIL, A_PASSWORD);

            await sut.register(A_USERNAME, AN_EMAIL, A_PASSWORD);

            expect(register).toBeCalledWith(expected);
        })
    })
})