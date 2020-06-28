import "reflect-metadata";
import EventBus from "../../../core/domain/events/eventBus";
import User from '../domain/aggregates/user';
const usertMock = User.prototype as jest.Mocked<typeof User.prototype>;
import UserRepository from "../domain/repositories/userRepository";
import AccountService from "./accountService";
import Email from '../domain/valueObjects/email';
import LoginFailure from '../domain/errors/loginFailure';
import HashedPassword from '../domain/valueObjects/hashedPassword';
import UserRole from "../domain/valueObjects/userRole";
import UnauthorizedAction from "../../../core/domain/errors/unauthorizedAction";
import TokenService from "../../tokens/application/tokenService";
import UserCreatedEvent from "../../../core/domain/events/events/userCreatedEvent";

describe('Account service', () => {
    const A_USERNAME = 'testerino';
    const AN_EMAIL = 'testerino@dumbbell.com';
    const A_PASSWORD = 'password1234';
    const create = jest.fn();
    const findByEmail = jest.fn();
    const generateToken = jest.fn().mockReturnValue('token')
    const repository = {
        create,
        findByEmail
    } as unknown as UserRepository;
    const fakeTokenService = {
        generateToken
    } as unknown as TokenService;
    const fakeEventBus = {
        publish: jest.fn(),
        subscribe: jest.fn()
    } as EventBus
    usertMock.hashPassword = jest.fn().mockReturnValue(A_PASSWORD);
    
    const sut = new AccountService(repository, fakeTokenService, fakeEventBus);

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    
    describe('Register', () => {
        test('Should register a new user', async () => {
            const expected = User.newUser(A_USERNAME, AN_EMAIL, A_PASSWORD);
            const expectedEvent = new UserCreatedEvent(AN_EMAIL, A_USERNAME, UserRole.USER);
            create.mockResolvedValue(expected);

            await sut.register(A_USERNAME, AN_EMAIL, A_PASSWORD);

            expect(create).toBeCalledWith(expected);
            expect(usertMock.hashPassword).toBeCalledTimes(1);
            expect(fakeEventBus.publish).toBeCalledWith(expectedEvent);
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
            expect(generateToken).toBeCalledWith('username');
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

            expect(generateToken).toBeCalledWith('username');
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