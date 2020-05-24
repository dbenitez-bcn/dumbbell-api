import "reflect-metadata";
import User from '../domain/aggregates/user';
const usertMock = User.prototype as jest.Mocked<typeof User.prototype>;
import UserRepository from "../domain/repositories/userRepository";
import AccountService from "./accountService";
import Email from '../domain/valueObjects/email';
import LoginFailure from '../domain/errors/loginFailure';
import HashedPassword from '../domain/valueObjects/hashedPassword';
import UserRole from "../domain/valueObjects/userRole";
import UnauthorizedAction from "../domain/errors/unauthorizedAction";
import TokenGeneratorService from "./tokenGeneratorService";

describe('Account service', () => {
    const A_USERNAME = 'testerino';
    const AN_EMAIL = 'testerino@dumbbell.com';
    const A_PASSWORD = 'password1234';
    const create = jest.fn();
    const findByEmail = jest.fn();
    const generateTokenFor = jest.fn().mockReturnValue('token')
    const repository: UserRepository = {
        create,
        findByEmail
    }
    const fakeTokenService = {
        generateTokenFor
    } as TokenGeneratorService;
    usertMock.hashPassword = jest.fn().mockReturnValue(A_PASSWORD);
    
    const sut = new AccountService(repository, fakeTokenService);

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    
    describe('Register', () => {
        test('Should register a new user', async () => {
            const expected = User.newUser(A_USERNAME, AN_EMAIL, A_PASSWORD);

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
            const user = new User('username', 'test@dumbbell.com', passwordDB, UserRole.USER);
            findByEmail.mockResolvedValue(user);

            const result = await sut.login(AN_EMAIL, A_PASSWORD);

            expect(findByEmail).toBeCalledWith(expectedEmail);
            expect(passwordDB.isEqualTo).toBeCalledWith(A_PASSWORD);
            expect(generateTokenFor).toBeCalledWith(user);
            expect(result).toBe('token');
        })

        test('Given wrong credentials should fail', async () => {
            const passwordDB = {
                isEqualTo: jest.fn().mockReturnValue(false)
            } as unknown as HashedPassword;
            const user = new User('username', 'test@dumbbell.com', passwordDB, UserRole.USER);
            findByEmail.mockResolvedValue(user);

            await expect(sut.login(AN_EMAIL, A_PASSWORD)).rejects.toThrowError(LoginFailure);
        })
    })

    describe('OperatorLogin', () => {
        test('Given credentials from an operators role user and right password should log in', async () => {
            const passwordMock = {
                isEqualTo: jest.fn().mockReturnValue(true)
            } as unknown as HashedPassword;
            const user = new User('username', AN_EMAIL, passwordMock, UserRole.OPERATOR);
            findByEmail.mockResolvedValue(user)
            const expectedEmail = new Email(AN_EMAIL);
            const result = await sut.operatorLogin(AN_EMAIL, A_PASSWORD);

            expect(generateTokenFor).toBeCalledWith(user);
            expect(findByEmail).toBeCalledWith(expectedEmail);
            expect(result).toBe('token');
        });

        test('Given credentials from a user role user should fail', async () => {
            const user = new User('username', AN_EMAIL, new HashedPassword(A_PASSWORD), UserRole.USER);
            findByEmail.mockResolvedValue(user)
            
            await expect(sut.operatorLogin(AN_EMAIL, A_PASSWORD)).rejects.toThrowError(UnauthorizedAction);
        });

        test('Given wrong credentials should fail', async () => {
            const passwordDB = {
                isEqualTo: jest.fn().mockReturnValue(false)
            } as unknown as HashedPassword;
            const user = new User('username', 'test@dumbbell.com', passwordDB, UserRole.OPERATOR);
            findByEmail.mockResolvedValue(user);

            await expect(sut.operatorLogin(AN_EMAIL, A_PASSWORD)).rejects.toThrowError(LoginFailure);
        })
    })
})