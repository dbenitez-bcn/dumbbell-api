const saveSpy = jest.fn();
const repoMock = jest.fn().mockReturnValue({
    save: saveSpy,
})
jest.mock('typeorm', () => ({
    getRepository: repoMock,
    PrimaryGeneratedColumn: jest.fn(),
    Unique: jest.fn(),
    Column: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    Entity: jest.fn(),
    OneToMany: jest.fn(),
    ManyToOne: jest.fn()
}));

jest.mock('inversify', () => ({
    injectable: jest.fn()
}));
import DatabaseFailure from "../../../domain/errors/DatabaseFailure";
import ExistingUsername from "../../../domain/errors/existingUsername";
import { getFakeUser, getFakeUserDB } from "../../../test/testUtils";
import User from "../../../domain/aggregates/user";
import TypeormExerciseUserRepository from "./typeormExerciseUserRepository";

describe("typeormExerciseUserRepository", () => {
    const sut = new TypeormExerciseUserRepository();
    
    describe('create', () => {
        const user = getFakeUser();
        test('Should save a user', async () => {
            const expectedUser = {
                username: user.username.value,
                role: user.role
            }
            const dbUser = getFakeUserDB();
            const expectedDomainUser = new User(dbUser.username, dbUser.role);
            saveSpy.mockResolvedValue(dbUser);

            const result = await sut.create(user);

            expect(saveSpy).toBeCalledWith(expectedUser);
            expect(result).toStrictEqual(expectedDomainUser);
        })

        test('Given an error when accessing to database should fail', async () => {
            saveSpy.mockRejectedValue(new Error());

            await expect(sut.create(user)).rejects.toThrowError(DatabaseFailure);
        })
        test('Given an existing username should fail', async () => {
            saveSpy.mockRejectedValue({
                detail: 'Key (username)=(username) already exists.',
            });

            await expect(sut.create(user)).rejects.toThrowError(ExistingUsername);
        })
    })

})