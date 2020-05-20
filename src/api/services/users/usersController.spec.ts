import "reflect-metadata";
import { Request } from "express";
import UsersController from "./usersController";
import AccountService from "../../../src/accounts/application/accountService";
import { FakeResponseBuilder } from "../../test/testutils";
import ExistingUsername from "../../../src/accounts/domain/errors/existingUsername";
import ExistingEmail from "../../../src/accounts/domain/errors/existingEmail";
import DatabaseFailure from "../../../src/exercises/domain/errors/DatabaseFailure";
import InvalidEmail from "../../../src/accounts/domain/errors/invalidEmail";
import InvalidPasswordFormat from "../../../src/accounts/domain/errors/invalidPasswordFormat";
import InvalidPasswordLength from "../../../src/accounts/domain/errors/invalidPasswordLength";
import InvalidUsernameLength from "../../../src/accounts/domain/errors/invalidUsername";
import InvalidUsernameFormat from "../../../src/accounts/domain/errors/invalidUsernameFormat";

describe('Users controller', () => {
    const register = jest.fn();
    const statusSpy = jest.fn().mockReturnThis();
    const sendSpy = jest.fn().mockReturnThis();
    const serviceMock = {} as AccountService;
    const res = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
    const req = {
        body: {
            username: 'username',
            email: 'test@dumbbell.com',
            password: 'password1234'
        }
    } as Request;

    const sut = new UsersController(serviceMock);

    beforeAll(() => {
        serviceMock.register = register;
    })

    describe('registration', () => {

        afterEach(() => {
            jest.clearAllMocks();
        })
        
        test('Should register a user for the given credentials', async () => {
            await sut.registration(req, res);

            expect(statusSpy).toBeCalledWith(201);
            expect(sendSpy).toBeCalledTimes(1);
            expect(register).toBeCalledWith('username', 'test@dumbbell.com', 'password1234');
        })

        test('Given an existing username should fail', async () => {
            const error = new ExistingUsername();
            register.mockRejectedValue(error);

            await sut.registration(req, res);

            expect(statusSpy).toBeCalledWith(409);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given an existing email should fail', async () => {
            const error = new ExistingEmail();
            register.mockRejectedValue(error);

            await sut.registration(req, res);

            expect(statusSpy).toBeCalledWith(409);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a database failure should fail', async () => {
            const error = new DatabaseFailure();
            register.mockRejectedValue(error);

            await sut.registration(req, res);

            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        describe('params failures', () => {

            afterEach(() => {
                jest.clearAllMocks();
            })

            test('Given invalid email when register should send a failure', async () => {
                const error = new InvalidEmail();
                register.mockRejectedValue(error);
    
                await sut.registration(req, res);
    
                expect(statusSpy).toBeCalledWith(422);
                expect(sendSpy).toBeCalledWith(error.message);
            })

            test('Given invalid password format when register should send a failure', async () => {
                const error = new InvalidPasswordFormat();
                register.mockRejectedValue(error);
    
                await sut.registration(req, res);
    
                expect(statusSpy).toBeCalledWith(422);
                expect(sendSpy).toBeCalledWith(error.message);
            })

            test('Given invalid password length when register should send a failure', async () => {
                const error = new InvalidPasswordLength();
                register.mockRejectedValue(error);
    
                await sut.registration(req, res);
    
                expect(statusSpy).toBeCalledWith(422);
                expect(sendSpy).toBeCalledWith(error.message);
            })

            test('Given invalid username format when register should send a failure', async () => {
                const error = new InvalidUsernameFormat();
                register.mockRejectedValue(error);
    
                await sut.registration(req, res);
    
                expect(statusSpy).toBeCalledWith(422);
                expect(sendSpy).toBeCalledWith(error.message);
            })

            test('Given invalid username length when register should send a failure', async () => {
                const error = new InvalidUsernameLength();
                register.mockRejectedValue(error);
    
                await sut.registration(req, res);
    
                expect(statusSpy).toBeCalledWith(422);
                expect(sendSpy).toBeCalledWith(error.message);
            })
        })
    })
})