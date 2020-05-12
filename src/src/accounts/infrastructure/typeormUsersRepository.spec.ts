import DatabaseFailure from "../../exercises/domain/errors/DatabaseFailure";
import { getFakeUser } from "../test/testUtils";

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

import TypeormUsersRepository from "./typeormUsersRepository";
import ExistingEmail from "../domain/errors/existingEmail";
import ExistingUsername from "../domain/errors/existingUsername";

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
})