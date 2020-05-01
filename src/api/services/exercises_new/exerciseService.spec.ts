import ExerciseRepository from "./exerciseRepository";
import ExerciseService from "./exerciseService";
import Exercise from "../../domain/aggregates/exercise";
import InvalidName from "../../errors/InvalidName";
import InvalidDescription from "../../errors/InvalidDescription";
import InvalidDifficulty from "../../errors/InvalidDifficulty";

describe('Exercise Service', () => {
    const createSpy = jest.fn();
    const repository: ExerciseRepository = {
        create: createSpy
    }
    const sut = new ExerciseService(repository);

    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    describe('create', () => {
        it('Should create an exercise for the given values', async () => {
            const expectedExercise = new Exercise('A name', 'A description', 5);

            await sut.create('A name', 'A description', 5);

            expect(createSpy).toBeCalledWith(expectedExercise)
        })

        describe('Name validations', () => {
            test('Given an empty name should fail', async () => {
                await expect(sut.create('', 'A description', 5)).rejects.toThrowError(new InvalidName());
            })

            test('Given a shot name should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 5);

                await sut.create('A name', 'A description', 5);

                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })

        describe('Description validations', () => {
            test('Given an empty description should fail', async () => {
                await expect(sut.create('A name', '', 5)).rejects.toThrowError(new InvalidDescription());
            })

            test('Given a shot description should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A', 5);

                await sut.create('A name', 'A', 5);

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

                await sut.create('A name', 'A description', 1);

                expect(createSpy).toBeCalledWith(expectedExercise)
            })

            test('Given a difficulty with value 10 should call the repository', async () => {
                const expectedExercise = new Exercise('A name', 'A description', 10);

                await sut.create('A name', 'A description', 10);

                expect(createSpy).toBeCalledWith(expectedExercise)
            })
        })
    })
})