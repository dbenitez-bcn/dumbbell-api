import "reflect-metadata";
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
import UnauthorizedAction from "../../../core/domain/errors/unauthorizedAction";

describe('Auth controller', () => {
    const login = jest.fn();
    const operatorLogin = jest.fn();
    const statusSpy = jest.fn().mockReturnThis();
    const sendSpy = jest.fn().mockReturnThis();
    const fakeService = {
        login,
        operatorLogin
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
            expect(sendSpy).toBeCalledWith({token: 'token'});
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

    describe('loginInAdmin', () => {
        afterEach(() => {
            jest.clearAllMocks();
        })

        test('Given a user with operator role when acces to admin panel should get the token', async () => {
            operatorLogin.mockResolvedValue('token');

            await sut.loginInAdmin(req, res);

            expect(operatorLogin).toBeCalledWith('test@dumbbell.com', 'password1234')
            expect(statusSpy).toBeCalledWith(200);
            expect(sendSpy).toBeCalledWith({token: 'token'});
        })

        test('Given a user with non operator role when acces to admin panel should fail', async () => {
            const error = new UnauthorizedAction();
            operatorLogin.mockRejectedValue(error);

            await sut.loginInAdmin(req, res);

            expect(operatorLogin).toBeCalledWith('test@dumbbell.com', 'password1234')
            expect(statusSpy).toBeCalledWith(401);
            expect(sendSpy).toBeCalledWith(error.message);
        })


        test('Given invalid password when login should send a failure', async () => {
            operatorLogin.mockRejectedValue(new LoginFailure());

            await sut.loginInAdmin(req, res);

            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
            expect(statusSpy).toBeCalledWith(401);
        })

        test('Given no user found for an email when login should send a failure', async () => {
            operatorLogin.mockRejectedValue(new UserNotFound());

            await sut.loginInAdmin(req, res);

            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
            expect(statusSpy).toBeCalledWith(404);
        })

        test('Given failure accessing to databse when login should send a failure', async () => {
            const error = new DatabaseFailure();
            operatorLogin.mockRejectedValue(error);

            await sut.loginInAdmin(req, res);

            expect(sendSpy).toBeCalledWith(error.message);
            expect(statusSpy).toBeCalledWith(500);
        })

        describe('params failures', () => {
            test('Given invalid email when login should send a failure', async () => {
                operatorLogin.mockRejectedValue(new InvalidEmail());

                await sut.loginInAdmin(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })

            test('Given invalid password format when login should send a failure', async () => {
                operatorLogin.mockRejectedValue(new InvalidPasswordFormat());

                await sut.loginInAdmin(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })

            test('Given invalid password length when login should send a failure', async () => {
                operatorLogin.mockRejectedValue(new InvalidPasswordLength());

                await sut.loginInAdmin(req, res)

                expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
                expect(statusSpy).toBeCalledWith(422);
            })
        })
    })
})