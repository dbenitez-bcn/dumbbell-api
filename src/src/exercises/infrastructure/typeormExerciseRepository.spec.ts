import ExerciseDomain from "../domain/aggregates/exercise";

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

import TypeormExerciseRepository from "./typeormExerciseRepository";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import { Exercise } from "../../../api/models/entities/exercise";

describe('Typeorm repository', () => {
    const sut = new TypeormExerciseRepository();

    afterEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers()
    })

    describe('create', () => {
        test('Should create an exercise and return the id', async () => {
            const exercise = new ExerciseDomain('A name', 'A description', 5);
            const params = {
                name: 'A name',
                description: 'A description',
                difficulty: 5
            }
            const expected: Exercise = new Exercise();
            saveSpy.mockResolvedValue(expected);

            const actual = await sut.create(exercise);

            expect(saveSpy).toBeCalledWith(params);
            expect(actual).toBe(expected);
        })

        test('Given an error when accesing repository hould throw an exeception', async () => {
            const exercise = new ExerciseDomain('A name', 'A description', 5);
            saveSpy.mockRejectedValue(new Error());

            await expect(sut.create(exercise)).rejects.toThrowError(new DatabaseFailure());
        })
    })
})