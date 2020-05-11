import bycrypt from 'bcryptjs';
const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";
import AccountService from "./accountService";

describe('Account service', () => {
    const A_USERNAME = 'testerino';
    const AN_EMAIL = 'testerino@dumbbell.com';
    const A_PASSWORD = 'password1234';
    const register = jest.fn();
    const repository: UserRepository = {
        register
    }

    bycryptMock.hashSync = jest.fn().mockReturnValue(A_PASSWORD);

    const sut = new AccountService(repository);
    describe('Register', () => {
        test('Should register a new user', async () => {
            const expected = new User(A_USERNAME, AN_EMAIL, A_PASSWORD);

            await sut.register(A_USERNAME, AN_EMAIL, A_PASSWORD);

            expect(register).toBeCalledWith(expected);
            expect(bycryptMock.hashSync).toBeCalledTimes(1);
        })
    })
})