import ExerciseDomain from "../domain/aggregates/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";

const saveSpy = jest.fn();
const findSpy = jest.fn();
const findOneOrFailSpy = jest.fn();
const repoMock = jest.fn().mockReturnValue({
    save: saveSpy,
    find: findSpy,
    findOneOrFail: findOneOrFailSpy
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
import { Exercise } from "../../../api/models/entities/exercise";

describe('Typeorm repository', () => {
    const AN_ID = new ExerciseId(1);
    const sut = new TypeormExerciseRepository();
    const dbExercise: Exercise = new Exercise();
    
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
            const expected = dbExercise;
            saveSpy.mockResolvedValue(expected);

            const actual = await sut.create(exercise);

            expect(saveSpy).toBeCalledWith(params);
            expect(actual).toBe(expected);
        })

        test('Given an error when accesing repository should throw an exeception', async () => {
            const exercise = new ExerciseDomain('A name', 'A description', 5);
            saveSpy.mockRejectedValue(new Error());

            await expect(sut.create(exercise)).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('get all', () => {
        test('Should get all exercises', async () => {
            const expected = [dbExercise, dbExercise, dbExercise];
            findSpy.mockResolvedValue(expected);

            const actual = await sut.getAll();

            expect(actual).toBe(expected);
            expect(findSpy).toBeCalledTimes(1);
        })

        test('Given an error when accesing repository should throw an exeception', async () => {
            findSpy.mockRejectedValue(new Error());

            await expect(sut.getAll()).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('get by id', () => {
        test('Given an id should find a single exercise', async () => {
            const expected = dbExercise;
            findOneOrFailSpy.mockResolvedValue(expected);

            const actual = await sut.getById(AN_ID)

            expect(actual).toBe(expected);
            expect(findOneOrFailSpy).toBeCalledWith(AN_ID.value);
        })

        test('Given an error when accesing repositroy should fail', async () => {
            findOneOrFailSpy.mockRejectedValue(new Error());

            await expect(sut.getById(AN_ID)).rejects.toThrowError(new DatabaseFailure());
        })
    })
})