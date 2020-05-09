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

describe('Exercise Service', () => {
    const fakeExerciseDTO = getFakeExerciseDTO();
    const AN_ID = 1234;
    const A_NAME = 'A name';
    const A_DESCRIPTION = 'A description';
    const A_DIFFICULTY = 5;
    const createSpy = jest.fn();
    const getAllSpy = jest.fn();
    const getByIdlSpy = jest.fn();
    const updateSpy = jest.fn();
    const deleteSpy = jest.fn();
    const repository: ExerciseRepository = {
        create: createSpy,
        getAll: getAllSpy,
        getById: getByIdlSpy,
        update: updateSpy,
        delete: deleteSpy
    }
    const sut = new ExerciseService(repository);

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    describe('create', () => {
        it('Should create an exercise for the given values', async () => {
            const expectedExercise = new Exercise('A name', 'A description', 5);
            createSpy.mockResolvedValue(fakeExerciseDTO)

            const result = await sut.create('A name', 'A description', 5);

            expect(result).toBe(fakeExerciseDTO);
            expect(createSpy).toBeCalledWith(expectedExercise)
        })

        describe('Name validations', () => {
            test('Given an empty name should fail', async () => {
                await expect(sut.create('', 'A description', 5)).rejects.toThrowError(new InvalidName());
            })

            test('Given a shot name should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 5);
                createSpy.mockResolvedValue(fakeExerciseDTO)

                const result = await sut.create('A name', 'A description', 5);

                expect(result).toBe(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Description validations', () => {
            test('Given an empty description should fail', async () => {
                await expect(sut.create('A name', '', 5)).rejects.toThrowError(new InvalidDescription());
            })

            test('Given a shot description should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A', 5);
                createSpy.mockResolvedValue(fakeExerciseDTO)

                const result = await sut.create('A name', 'A', 5);

                expect(result).toBe(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Difficulty validations', () => {
            test('Given a difficulty less than 1 should fail', async () => {
                await expect(sut.create('A name', 'A description', 0)).rejects.toThrowError(new InvalidDifficulty());
            })

            test('Given a difficulty more than 10 should fail', async () => {
                await expect(sut.create('A name', 'A description', 11)).rejects.toThrowError(new InvalidDifficulty());
            })

            test('Given a difficulty with value 1 should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 1);
                createSpy.mockResolvedValue(fakeExerciseDTO)

                const result = await sut.create('A name', 'A description', 1);

                expect(result).toBe(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })

            test('Given a difficulty with value 10 should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 10);
                createSpy.mockResolvedValue(fakeExerciseDTO)

                const result = await sut.create('A name', 'A description', 10);

                expect(result).toBe(fakeExerciseDTO);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })
    })

    describe('Get all', () => {
        test('Should return all exercises', async () => {
            const expected = [fakeExerciseDTO, fakeExerciseDTO, fakeExerciseDTO];
            getAllSpy.mockResolvedValue(expected);

            const result = await sut.getAll();

            expect(getAllSpy).toBeCalledTimes(1);
            expect(result).toBe(expected);
        })
    })

    describe('Get by id', () => {
        test('Given an id should return a single exercise', async () => {
            const id = new ExerciseId(AN_ID);
            getByIdlSpy.mockResolvedValue(fakeExerciseDTO);

            const result = await sut.getById(AN_ID);

            expect(getByIdlSpy).lastCalledWith(id);
            expect(result).toBe(fakeExerciseDTO);
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
            await sut.update(AN_ID, A_NAME, A_DESCRIPTION, A_DIFFICULTY);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no name should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                description: new Description(A_DESCRIPTION),
                difficutly: new Difficulty(A_DIFFICULTY)
            }
            await sut.update(AN_ID, null!, A_DESCRIPTION, A_DIFFICULTY);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no description should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                name: new Name(A_NAME),
                difficutly: new Difficulty(A_DIFFICULTY)
            }
            await sut.update(AN_ID, A_NAME, null!, A_DIFFICULTY);

            expect(updateSpy).toBeCalledWith(id, params);
        })

        test('Given no difficutly should update an exercise', async () => {
            const id = new ExerciseId(AN_ID);
            const params: ExerciseParams = {
                name: new Name(A_NAME),
                description: new Description(A_DESCRIPTION)
            }
            await sut.update(AN_ID, A_NAME, A_DESCRIPTION, null!);

            expect(updateSpy).toBeCalledWith(id, params);
        })
        
        test('Given empty name should fail', async () => {
            await expect(sut.update(AN_ID, '', A_DESCRIPTION, A_DIFFICULTY)).rejects.toThrowError(new InvalidName());
        })
        
        test('Given empty description should fail', async () => {
            await expect(sut.update(AN_ID, A_NAME, '', A_DIFFICULTY)).rejects.toThrowError(new InvalidDescription());
        })
        
        test('Given invalid difficutly should fail', async () => {
            await expect(sut.update(AN_ID, A_NAME, A_DESCRIPTION, 0)).rejects.toThrowError(new InvalidDifficulty());
        })  
        
        test('Given no id should fail', async () => {
            await expect(sut.update(null!, A_NAME, A_DESCRIPTION, A_DIFFICULTY)).rejects.toThrowError(new InvalidExerciseId());
        })        
    })

    describe('Delete', () => {
        test('Given an id should delete an exercise', async () => {
            const expectedId = new ExerciseId(AN_ID);

            await sut.delete(AN_ID);

            expect(deleteSpy).toBeCalledWith(expectedId);
        })

        test('Given an invalid id should fail', async () => {
            await expect(sut.getById(0)).rejects.toThrowError(new InvalidExerciseId());
        })
    })
})