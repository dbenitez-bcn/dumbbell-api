import { Request } from "express";
import AuthController from "./authController";
import { FakeResponseBuilder } from "../../test/testutils";
import AccountService from "../../../src/accounts/application/accountService";
import LoginFailure from "../../../src/accounts/domain/errors/loginFailure";
import { Constants } from "../../config/constants";
import UserNotFound from "../../../src/accounts/domain/errors/userNotFound";
import DatabaseFailure from "../../../src/exercises/domain/errors/DatabaseFailure";
import InvalidEmail from "../../../src/accounts/domain/errors/invalidEmail";
import InvalidPasswordFormat from "../../../src/accounts/domain/errors/invalidPasswordFormat";
import InvalidPasswordLength from "../../../src/accounts/domain/errors/invalidPasswordLength";

describe('Auth controller', () => {
    const login = jest.fn();
    const statusSpy = jest.fn().mockReturnThis();
    const sendSpy = jest.fn().mockReturnThis();
    const fakeService = {
        login
    } as unknown as AccountService;
    const res = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
    const req = {
        body: {
            email: 'test@dumbbell.com',
            password: 'password1234'
        }
    } as Request;

    const sut = new AuthController(fakeService);

    describe('login', () => {

        afterEach(() => {
            jest.clearAllMocks();
        })

        test('When login is success should send the token', async () => {
            login.mockResolvedValue('token');

            await sut.login(req, res);

            expect(login).toBeCalledWith('test@dumbbell.com', 'password1234');
            expect(sendSpy).toBeCalledWith('token');
            expect(statusSpy).toBeCalledWith(200);
        })

        test('Given invalid password when login should send a failure', async () => {
            login.mockRejectedValue(new LoginFailure());

            await sut.login(req, res);

            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
            expect(statusSpy).toBeCalledWith(401);
        })

        test('Given no user found for an email when login should send a failure', async () => {
            login.mockRejectedValue(new UserNotFound());

            await sut.login(req, res);

            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
            expect(statusSpy).toBeCalledWith(404);
        })

        test('Given failure accessing to databse when login should send a failure', async () => {
            const error = new DatabaseFailure();
            login.mockRejectedValue(error);

            await sut.login(req, res);

            expect(sendSpy).toBeCalledWith(error.message);
            expect(statusSpy).toBeCalledWith(500);
        })
        
        describe('params failures', () => {
            test('Given invalid email when login should send a failure', async () => {
                login.mockRejectedValue(new InvalidEmail());

                await sut.login(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })

            test('Given invalid password format when login should send a failure', async () => {
                login.mockRejectedValue(new InvalidPasswordFormat());

                await sut.login(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })

            test('Given invalid password length when login should send a failure', async () => {
                login.mockRejectedValue(new InvalidPasswordLength());

                await sut.login(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })
        })
    })
})