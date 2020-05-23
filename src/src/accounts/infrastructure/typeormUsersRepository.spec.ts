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
import UserDB from "../domain/typeormEntities/user";
import UserRole from "../domain/valueObjects/userRole";
import User from "../domain/aggregates/user";

describe('typeormUsersRepository', () => {
    const sut = new TypeormUsersRepository();

    describe('create', () => {
        const user = getFakeUser();
        test('Should save a user', async () => {
            const expectedUser = {
                username: user.username.value,
                email: user.email.value,
                password: user.password.value
            }

            await sut.create(user);

            expect(insertSpy).toBeCalledWith(expectedUser);
        })

        test('Given an error when accessing to database should fail', async () => {
            insertSpy.mockRejectedValue(new Error());

            await expect(sut.create(user)).rejects.toThrowError(DatabaseFailure);
        })

        test('Given an existing email should fail', async () => {
            insertSpy.mockRejectedValue({
                detail: 'Key (email)=(email) already exists.',
            });

            await expect(sut.create(user)).rejects.toThrowError(ExistingEmail);
        })
        test('Given an existing username should fail', async () => {
            insertSpy.mockRejectedValue({
                detail: 'Key (username)=(username) already exists.',
            });

            await expect(sut.create(user)).rejects.toThrowError(ExistingUsername);
        })
    })

    describe('findByEmail', () => {
        const email = new Email('test@dumbbell.com');
        test('Should return a hashed password', async () => {
            const userDB = new UserDB();
            userDB.password = 'hashedpassword';
            userDB.email = 'test@dumbbell.com';
            userDB.username = 'username';
            userDB.role = UserRole.USER;
            findOneSpy.mockResolvedValue(userDB);
            const expected = User.fromDB(userDB);

            const result = await sut.findByEmail(email);

            expect(findOneSpy).toBeCalledWith({email: email.value});
            expect(result).toStrictEqual(expected);
        })

        test('Given no user should fail', async () => {
            findOneSpy.mockResolvedValue(undefined);

            await expect(sut.findByEmail(email)).rejects.toThrowError(UserNotFound);
        })

        test('Given an error when accessing to databse should fail', async () => {
            findOneSpy.mockRejectedValue(new Error());

            await expect(sut.findByEmail(email)).rejects.toThrowError(DatabaseFailure);
        })
    })
})