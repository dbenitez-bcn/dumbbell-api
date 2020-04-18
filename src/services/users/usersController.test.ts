// jest.mock('typeorm')
import bycrypt from 'bcryptjs';
import { UserRegistrationBody } from "../../models/bodies/userRegistrationBody";
import { UserRegistrationRequest } from '../../models/requests/userRegistrationRequest';
import { User } from '../../models/entities/user';
import { FakeResponse, FakeResponseBuilder } from '../../test/testutils';

const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
describe('Users controller', () => {
    describe('Registration', () => {
        const parseSpy = jest.fn();
        jest.mock('./validations', () => ({
            parseUserRegistrationBody: parseSpy
        }));
        const statusSpy = jest.fn().mockReturnThis();
        const sendSpy = jest.fn().mockReturnThis();
        const body: UserRegistrationBody = {
            email: "email",
            username: "username",
            password: "password"
        }
        const res: FakeResponse = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
        const req = {
            body
        }

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Given valid params should save a user in the database', async () => {
            const hashSpy = jest.fn().mockReturnValue('cryptedPassword');
            bycryptMock.hash = hashSpy;
            const saveSpy = jest.fn();
            const repoMock = jest.fn().mockReturnValue({
                save: saveSpy
            })
            jest.mock('typeorm', () => ({
                getRepository: repoMock,
                PrimaryGeneratedColumn: jest.fn(),
                Unique: jest.fn(),
                Column: jest.fn(),
                CreateDateColumn: jest.fn(),
                UpdateDateColumn: jest.fn(),
                Entity: jest.fn()
            }));
            parseSpy.mockResolvedValue(new UserRegistrationRequest(body.username, body.email, body.password));
            const { userRegistrationHandler } = require('./usersController');
            const expectedUser = new User();
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
    })
})