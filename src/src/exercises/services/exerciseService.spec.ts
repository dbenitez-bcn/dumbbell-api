import "reflect-metadata";
import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseService from "./exerciseService";
import Exercise from "../domain/aggregates/exercise";
import InvalidName from "../domain/errors/InvalidName";
import InvalidDescription from "../domain/errors/InvalidDescription";
import InvalidDifficulty from "../domain/errors/InvalidDifficulty";
import { getFakeExerciseDTO } from "../test/testUtils";
import ExerciseId from "../domain/valueObject/exerciseId";
import InvalidExerciseId from "../domain/errors/InvalidExerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import Name from "../domain/valueObject/name";
import Description from "../domain/valueObject/description";
import Difficulty from "../domain/valueObject/difficulty";
import InvalidCreatedBy from "../domain/errors/InvalidCreatedBy";
import UserRepository from "../../accounts/domain/repositories/userRepository";
import UnauthorizedAction from "../../../core/domain/errors/unauthorizedAction";
import CreatedBy from "../domain/valueObject/createdBy";

describe('Exercise Service', () => {
    const fakeExerciseDTO = getFakeExerciseDTO();
    const receivedExercise = new Exercise(fakeExerciseDTO.id, fakeExerciseDTO.name, fakeExerciseDTO.description, fakeExerciseDTO.difficulty, fakeExerciseDTO.createdBy);
    const AN_ID = 1234;
    const A_NAME = 'A name';
    const A_DESCRIPTION = 'A description';
    const A_DIFFICULTY = 5;
    const A_USERNAME = 'username';
    const createSpy = jest.fn();
    const getAllSpy = jest.fn();
    const getByIdlSpy = jest.fn();
    const updateSpy = jest.fn();
    const deleteSpy = jest.fn();
    const findByEmail = jest.fn();
    const repository: ExerciseRepository = {
        create: createSpy,
        getAll: getAllSpy,
        getById: getByIdlSpy,
        update: updateSpy,
        delete: deleteSpy
    }
    const userRepository = {
        findByEmail
    } as unknown as UserRepository;
    const sut = new ExerciseService(repository);

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    describe('create', () => {
        it('Should create an exercise for the given values', async () => {
            const expectedExercise = new Exercise(0, 'A name', 'A description', 5, 'username');
            createSpy.mockResolvedValue(receivedExercise)

            const result = await sut.create('A name', 'A description', 5, 'username');

            expect(result).toStrictEqual(fakeExerciseDTO);
            expect(createSpy).toBeCalledWith(expectedExercise)
        })

        describe('Name validations', () => {
            test('Given an empty name should fail', async () => {
                await expect(sut.create('', 'A description', 5, 'username')).rejects.toThrowError(new InvalidName());
            })

            test('Given a short name should call the repository', async () => {
                const expectedExercise = new Exercise(0, 'A name', 'A description', 5, 'username');
                createSpy.mockResolvedValue(receivedExercise)

                const result = await sut.create('A name', 'A description', 5, 'username');

                expect(result).toStrictEqual(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Description validations', () => {
            test('Given an empty description should fail', async () => {
                await expect(sut.create('A name', '', 5, 'username')).rejects.toThrowError(new InvalidDescription());
            })

            test('Given a short description should call the repository', async () => {
                const expectedExercise = new Exercise(0, 'A name', 'A', 5, 'username');
                createSpy.mockResolvedValue(receivedExercise)

                const result = await sut.create('A name', 'A', 5, 'username');

                expect(result).toStrictEqual(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Difficulty validations', () => {
            test('Given a difficulty less than 1 should fail', async () => {
                await expect(sut.create('A name', 'A description', 0, 'username')).rejects.toThrowError(new InvalidDifficulty());
            })

            test('Given a difficulty more than 10 should fail', async () => {
                await expect(sut.create('A name', 'A description', 11, 'username')).rejects.toThrowError(new InvalidDifficulty());
            })

            test('Given a difficulty with value 1 should call the repository', async () => {
                const expectedExercise = new Exercise(0, 'A name', 'A description', 1, 'username');
                createSpy.mockResolvedValue(receivedExercise)

                const result = await sut.create('A name', 'A description', 1, 'username');

                expect(result).toStrictEqual(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })

            test('Given a difficulty with value 10 should call the repository', async () => {
                const expectedExercise = new Exercise(0, 'A name', 'A description', 10, 'username');
                createSpy.mockResolvedValue(receivedExercise)

                const result = await sut.create('A name', 'A description', 10, 'username');

                expect(result).toStrictEqual(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('CreatedBy validations', () => {
            test('Given an empty username should fail', async () => {
                await expect(sut.create('A name', 'A description', 5, '')).rejects.toThrowError(new InvalidCreatedBy());
            })
        })
    })

    describe('Get all', () => {
        test('Should return all exercises', async () => {
            const received = [receivedExercise, receivedExercise, receivedExercise];
            const expected = [fakeExerciseDTO, fakeExerciseDTO, fakeExerciseDTO];
            getAllSpy.mockResolvedValue(received);

            const result = await sut.getAll();

            expect(getAllSpy).toBeCalledTimes(1);
            expect(result).toStrictEqual(expected);
        })
    })

    describe('Get by id', () => {
        test('Given an id should return a single exercise', async () => {
            const id = new ExerciseId(AN_ID);
            getByIdlSpy.mockResolvedValue(receivedExercise);

            const result = await sut.getById(AN_ID);

            expect(getByIdlSpy).lastCalledWith(id);
            expect(result).toStrictEqual(fakeExerciseDTO);
        })

        test('Given a zero as id should fail', async () => {
            await expect(sut.getById(0)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a NaN as id should fail', async () => {
            await expect(sut.getById(NaN)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a negative number as id should fail', async () => {
            await expect(sut.getById(-1234)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a decimal number as id should fail', async () => {
            await expect(sut.getById(0.3)).rejects.toThrowError(new InvalidExerciseId());
        })
    })

    describe('update', () => {
        test('Should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                name: new Name(A_NAME),
                description: new Description(A_DESCRIPTION),
                difficutly: new Difficulty(A_DIFFICULTY)
            }
            getByIdlSpy.mockResolvedValue({
                createdBy: new CreatedBy(A_USERNAME)
            });
            
            await sut.update(AN_ID, A_NAME, A_DESCRIPTION, A_DIFFICULTY, A_USERNAME);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no name should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                description: new Description(A_DESCRIPTION),
                difficutly: new Difficulty(A_DIFFICULTY)
            }
            await sut.update(AN_ID, null!, A_DESCRIPTION, A_DIFFICULTY, A_USERNAME);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no description should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                name: new Name(A_NAME),
                difficutly: new Difficulty(A_DIFFICULTY)
            }
            await sut.update(AN_ID, A_NAME, null!, A_DIFFICULTY, A_USERNAME);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no difficutly should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                name: new Name(A_NAME),
                description: new Description(A_DESCRIPTION)
            }
            await sut.update(AN_ID, A_NAME, A_DESCRIPTION, null!, A_USERNAME);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given empty name should fail', async () => {
            await expect(sut.update(AN_ID, '', A_DESCRIPTION, A_DIFFICULTY, A_USERNAME)).rejects.toThrowError(new InvalidName());
        })

        test('Given empty description should fail', async () => {
            await expect(sut.update(AN_ID, A_NAME, '', A_DIFFICULTY, A_USERNAME)).rejects.toThrowError(new InvalidDescription());
        })

        test('Given invalid difficutly should fail', async () => {
            await expect(sut.update(AN_ID, A_NAME, A_DESCRIPTION, 0, A_USERNAME)).rejects.toThrowError(new InvalidDifficulty());
        })

        test('Given no id should fail', async () => {
            await expect(sut.update(null!, A_NAME, A_DESCRIPTION, A_DIFFICULTY, A_USERNAME)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a user that did not create the exercise should fail', async () => {
            const id = new ExerciseId(AN_ID);
            getByIdlSpy.mockResolvedValue({
                createdBy: new CreatedBy('testerino')
            });

            await expect(sut.update(AN_ID, A_NAME, A_DESCRIPTION, A_DIFFICULTY, A_USERNAME)).rejects.toThrowError(new UnauthorizedAction());
            expect(getByIdlSpy).toBeCalledWith(id);
        })
    })

    describe('Delete', () => {
        test('Given an id should delete an exercise', async () => {
            const expectedId = new ExerciseId(AN_ID);
            getByIdlSpy.mockResolvedValue({
                createdBy: new CreatedBy(A_USERNAME)
            });

            await sut.delete(AN_ID, A_USERNAME);

            expect(deleteSpy).toBeCalledWith(expectedId);
        })

        test('Given an invalid id should fail', async () => {
            await expect(sut.delete(0, A_USERNAME)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a user that did not create the exercise should fail', async () => {
            const id = new ExerciseId(AN_ID);
            getByIdlSpy.mockResolvedValue({
                createdBy: new CreatedBy('testerino')
            });

            await expect(sut.delete(AN_ID, A_USERNAME)).rejects.toThrowError(new UnauthorizedAction());
            expect(getByIdlSpy).toBeCalledWith(id);
        })
    })
})