// jest.mock('typeorm')
import bycrypt from 'bcryptjs';
import { UserRegistrationBody } from "../../models/bodies/userRegistrationBody";
import { UserRegistrationRequest } from '../../models/requests/userRegistrationRequest';
import UserDB from '../../models/entities/user';
import { FakeResponse, FakeResponseBuilder } from '../../test/testutils';
import { Constants } from '../../config/constants';

const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
describe('Users controller', () => {
    describe('Registration', () => {
        const parseSpy = jest.fn();
        const hashSpy = jest.fn().mockReturnValue('cryptedPassword');
        const statusSpy = jest.fn().mockReturnThis();
        const sendSpy = jest.fn().mockReturnThis();
        const saveSpy = jest.fn();
        const repoMock = jest.fn().mockReturnValue({
            save: saveSpy
        })
        const body: UserRegistrationBody = {
            email: "email",
            username: "username",
            password: "password"
        }
        const res: FakeResponse = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
        const req = {
            body
        }
        bycryptMock.hash = hashSpy;
        jest.mock('./validations', () => ({
            parseUserRegistrationBody: parseSpy
        }));
        jest.mock('typeorm', () => ({
            getRepository: repoMock,
            PrimaryGeneratedColumn: jest.fn(),
            Unique: jest.fn(),
            Column: jest.fn(),
            CreateDateColumn: jest.fn(),
            UpdateDateColumn: jest.fn(),
            Entity: jest.fn()
        }));

        beforeEach(() => {
            parseSpy.mockResolvedValue(new UserRegistrationRequest(body.username, body.email, body.password));
        })

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Given valid params should save a user in the database', async () => {
            const { userRegistrationHandler } = require('./usersController');
            const expectedUser = new UserDB();
            expectedUser.email = body.email;
            expectedUser.password = 'cryptedPassword';
            expectedUser.username = body.username;

            await userRegistrationHandler(req, res);

            expect(parseSpy).toHaveBeenCalledWith(body);
            expect(statusSpy).toBeCalledWith(201);
            expect(hashSpy).toHaveBeenLastCalledWith(body.password, 10);
            expect(saveSpy).toHaveBeenCalledWith(expectedUser);
            expect(sendSpy).toHaveBeenCalledTimes(1);
        })

        test('Given invalid params should fail and send an error', async () => {
            parseSpy.mockImplementation(() => { throw new Error('Invalid params') });
            const { userRegistrationHandler } = require('./usersController');

            await userRegistrationHandler(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith('Invalid params');
        })

        test('given an existing username should fail and send an error', async () => {
            saveSpy.mockRejectedValue({
                detail: 'Key (username)=(username) already exists.',
            });
            const { userRegistrationHandler } = require('./usersController');

            await userRegistrationHandler(req, res);

            expect(statusSpy).toBeCalledWith(409);
            expect(sendSpy).toBeCalledWith(Constants.USERNAME_ALREADY_EXIST);
        })
        test('given an existing email should fail and send an error', async () => {
            saveSpy.mockRejectedValue({
                detail: 'Key (email)=(email) already exists.',
            });
            const { userRegistrationHandler } = require('./usersController');

            await userRegistrationHandler(req, res);

            expect(statusSpy).toBeCalledWith(409);
            expect(sendSpy).toBeCalledWith(Constants.EMAIL_ALREADY_EXIST);
        })
    })
})