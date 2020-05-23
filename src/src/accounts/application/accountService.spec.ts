import "reflect-metadata";
import User from '../domain/aggregates/user';
const usertMock = User.prototype as jest.Mocked<typeof User.prototype>;
import UserRepository from "../domain/repositories/userRepository";
import AccountService from "./accountService";
import Email from '../domain/valueObjects/email';
import LoginFailure from '../domain/errors/loginFailure';
import HashedPassword from '../domain/valueObjects/hashedPassword';

describe('Account service', () => {
    const A_USERNAME = 'testerino';
    const AN_EMAIL = 'testerino@dumbbell.com';
    const A_PASSWORD = 'password1234';
    const create = jest.fn();
    const findByEmail = jest.fn();
    const repository: UserRepository = {
        create,
        findByEmail
    }
    usertMock.hashPassword = jest.fn().mockReturnValue(A_PASSWORD);
    
    const sut = new AccountService(repository);

    describe('Register', () => {
        test('Should register a new user', async () => {
            const expected = new User(A_USERNAME, AN_EMAIL, A_PASSWORD);

            await sut.register(A_USERNAME, AN_EMAIL, A_PASSWORD);

            expect(create).toBeCalledWith(expected);
            expect(usertMock.hashPassword).toBeCalledTimes(1);
        })
    })

    describe('Login', () => {
        test('Given right credentials should login the user', async () => {
            const expectedEmail = new Email(AN_EMAIL);
            const passwordDB = {
                isEqualTo: jest.fn().mockReturnValue(true)
            } as unknown as HashedPassword;
            findByEmail.mockResolvedValue(passwordDB);

            const result = await sut.login(AN_EMAIL, A_PASSWORD);

            expect(findByEmail).toBeCalledWith(expectedEmail);
            expect(passwordDB.isEqualTo).toBeCalledWith(A_PASSWORD);
            expect(result).toBe('token');
        })

        test('Given wrong credentials should fail', async () => {
            const passwordDB = {
                isEqualTo: jest.fn().mockReturnValue(false)
            } as unknown as HashedPassword;
            findByEmail.mockResolvedValue(passwordDB);

            await expect(sut.login(AN_EMAIL, A_PASSWORD)).rejects.toThrowError(LoginFailure);
        })
    })
})