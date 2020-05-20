import DatabaseFailure from "../../exercises/domain/errors/DatabaseFailure";
import { getFakeUser } from "../test/testUtils";
import HashedPassword from "../domain/valueObjects/hashedPassword";
import UserNotFound from "../domain/errors/userNotFound";
import ExistingEmail from "../domain/errors/existingEmail";
import ExistingUsername from "../domain/errors/existingUsername";
import Email from "../domain/valueObjects/email";

const insertSpy = jest.fn();
const findOneSpy = jest.fn();
const repoMock = jest.fn().mockReturnValue({
    insert: insertSpy,
    findOne: findOneSpy,
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

jest.mock('inversify', () => ({
    injectable: jest.fn()
}));

import TypeormUsersRepository from "./typeormUsersRepository";
import UserDB from "../../../api/models/entities/user";

describe('typeormUsersRepository', () => {
    const sut = new TypeormUsersRepository();

    describe('register', () => {
        const user = getFakeUser();
        test('Should save a user', async () => {
            const expectedUser = {
                username: user.username.value,
                email: user.email.value,
                password: user.password.value
            }

            await sut.register(user);

            expect(insertSpy).toBeCalledWith(expectedUser);
        })

        test('Given an error when accessing to database should fail', async () => {
            insertSpy.mockRejectedValue(new Error());

            await expect(sut.register(user)).rejects.toThrowError(DatabaseFailure);
        })

        test('Given an existing email should fail', async () => {
            insertSpy.mockRejectedValue({
                detail: 'Key (email)=(email) already exists.',
            });

            await expect(sut.register(user)).rejects.toThrowError(ExistingEmail);
        })
        test('Given an existing username should fail', async () => {
            insertSpy.mockRejectedValue({
                detail: 'Key (username)=(username) already exists.',
            });

            await expect(sut.register(user)).rejects.toThrowError(ExistingUsername);
        })
    })

    describe('login', () => {
        const email = new Email('test@dumbbell.com');
        test('Should return a hashed password', async () => {
            const expected = new HashedPassword('hashedpassword');
            const userDB = new UserDB();
            userDB.password = 'hashedpassword';
            findOneSpy.mockResolvedValue(userDB);

            const result = await sut.login(email);

            expect(findOneSpy).toBeCalledWith({email: email.value});
            expect(result).toStrictEqual(expected);
        })

        test('Given no user should fail', async () => {
            findOneSpy.mockResolvedValue(undefined);

            await expect(sut.login(email)).rejects.toThrowError(UserNotFound);
        })

        test('Given an error when accessing to databse should fail', async () => {
            findOneSpy.mockRejectedValue(new Error());

            await expect(sut.login(email)).rejects.toThrowError(DatabaseFailure);
        })
    })
})