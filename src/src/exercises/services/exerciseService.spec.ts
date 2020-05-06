import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseService from "./exerciseService";
import Exercise from "../domain/aggregates/exercise";
import InvalidName from "../domain/errors/InvalidName";
import InvalidDescription from "../domain/errors/InvalidDescription";
import InvalidDifficulty from "../domain/errors/InvalidDifficulty";
import { getFakeExercise } from "../test/testUtils";
import ExerciseId from "../domain/valueObject/exerciseId";
import InvalidExerciseId from "../domain/errors/InvalidExerciseId";

describe('Exercise Service', () => {
    const fakeExercise = getFakeExercise();
    const createSpy = jest.fn();
    const getAllSpy = jest.fn();
    const getByIdlSpy = jest.fn();
    const updateSpy = jest.fn();
    const deleteSpy = jest.fn();
    const repository: ExerciseRepository<Exercise> = {
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
            createSpy.mockResolvedValue(fakeExercise)

            const result = await sut.create('A name', 'A description', 5);

            expect(result).toBe(fakeExercise);
            expect(createSpy).toBeCalledWith(expectedExercise)
        })

        describe('Name validations', () => {
            test('Given an empty name should fail', async () => {
                await expect(sut.create('', 'A description', 5)).rejects.toThrowError(new InvalidName());
            })

            test('Given a shot name should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 5);
                createSpy.mockResolvedValue(fakeExercise)

                const result = await sut.create('A name', 'A description', 5);

                expect(result).toBe(fakeExercise);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Description validations', () => {
            test('Given an empty description should fail', async () => {
                await expect(sut.create('A name', '', 5)).rejects.toThrowError(new InvalidDescription());
            })

            test('Given a shot description should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A', 5);
                createSpy.mockResolvedValue(fakeExercise)

                const result = await sut.create('A name', 'A', 5);

                expect(result).toBe(fakeExercise);
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
                createSpy.mockResolvedValue(fakeExercise)

                const result = await sut.create('A name', 'A description', 1);

                expect(result).toBe(fakeExercise);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })

            test('Given a difficulty with value 10 should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 10);
                createSpy.mockResolvedValue(fakeExercise)

                const result = await sut.create('A name', 'A description', 10);

                expect(result).toBe(fakeExercise);
                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })
    })

    describe('Get all', () => {
        test('Should return all exercises', async () => {
            const expected = [fakeExercise, fakeExercise, fakeExercise];
            getAllSpy.mockResolvedValue(expected);

            const result = await sut.getAll();

            expect(getAllSpy).toBeCalledTimes(1);
            expect(result).toBe(expected);
        })
    })

    describe('Get by id', () => {
        test('Given an id should return a single exercise', async () => {
            const id = new ExerciseId(1234);
            getByIdlSpy.mockResolvedValue(fakeExercise);

            const result = await sut.getById(1234);

            expect(getByIdlSpy).lastCalledWith(id);
            expect(result).toBe(fakeExercise);
        })

        test('Given a zero as id should fail', async () => {
            await expect(sut.getById(0)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a negative number as id should fail', async () => {
            await expect(sut.getById(-1234)).rejects.toThrowError(new InvalidExerciseId());
        })

        test('Given a decimal number as id should fail', async () => {
            await expect(sut.getById(0.3)).rejects.toThrowError(new InvalidExerciseId());
        })
    })
})