import bycrypt from 'bcryptjs';
import { FakeResponse, FakeResponseBuilder } from "../../test/testutils";
import { LoginBody } from "../../models/bodies/loginBody";
import { Constants } from '../../config/constants';
import LoginRequest from '../../models/requests/loginRequest';

describe('Auth controller', () => {
    const AN_EMAIL = 'email@dumbbell.com';
    const A_PASSWORD = 'password';
    const A_CRYPTED_PASSWORD = 'dbPassw0rd';

    describe('login', () => {
        const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
        const statusSpy = jest.fn().mockReturnThis();
        const sendSpy = jest.fn().mockReturnThis();
        const compareSpy = jest.fn().mockResolvedValue(true);
        const findSpy = jest.fn();
        const parseSpy = jest.fn();
        const repoMock = jest.fn().mockReturnValue({
            findOneOrFail: findSpy
        })
        const body: LoginBody = {
            email: AN_EMAIL,
            password: A_PASSWORD
        }
        const res: FakeResponse = new FakeResponseBuilder().withSend(sendSpy).withStatus(statusSpy).build();
        const req = {
            body
        }
        bycryptMock.compare = compareSpy;
        jest.mock('typeorm', () => ({
            getRepository: repoMock,
            PrimaryGeneratedColumn: jest.fn(),
            Unique: jest.fn(),
            Column: jest.fn(),
            CreateDateColumn: jest.fn(),
            UpdateDateColumn: jest.fn(),
            Entity: jest.fn()
        }));
        jest.mock('./validations', () => ({
            parseLoginBody: parseSpy
        }));

        beforeEach(() => {
            parseSpy.mockResolvedValue(new LoginRequest(AN_EMAIL, A_PASSWORD));
            findSpy.mockReturnValue({
                password: A_CRYPTED_PASSWORD
            });
        })

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Given a credentials should success', async () => {
            const { loginHandler } = require('./authController');

            await loginHandler(req, res);

            expect(parseSpy).toBeCalledWith(body);
            expect(findSpy).toBeCalledWith({ email: AN_EMAIL })
            expect(compareSpy).toBeCalledWith(A_PASSWORD, A_CRYPTED_PASSWORD);
            expect(statusSpy).toBeCalledWith(200);
            expect(sendSpy).toBeCalledTimes(1);
        })

        test('Given invalid credentials should fail and send an error', async () => {
            parseSpy.mockRejectedValue(new Error('Invalid params'))
            const { loginHandler } = require('./authController')

            await loginHandler(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith('Invalid params');
        })

        test('Given that a user is not found should fail and send an error', async () => {
            findSpy.mockRejectedValue(new Error());
            const { loginHandler } = require('./authController');

            await loginHandler(req, res);

            expect(statusSpy).toBeCalledWith(404);
            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
        })


        test('Given wrong password should fail and send an error', async () => {
            compareSpy.mockResolvedValue(false);
            const { loginHandler } = require('./authController');

            await loginHandler(req, res);

            expect(statusSpy).toBeCalledWith(401);
            expect(sendSpy).toBeCalledWith(Constants.LOGIN_FAILURE);
        })
    })
})