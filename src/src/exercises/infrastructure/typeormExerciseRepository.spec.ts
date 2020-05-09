import ExerciseDTO from "../domain/dtos/exerciseDTO";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import Difficulty from "../domain/valueObject/difficulty";
import Description from "../domain/valueObject/description";
import Name from "../domain/valueObject/name";
import ExercisesNotFound from "../domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../domain/errors/ExerciseNotFound";

const saveSpy = jest.fn();
const findSpy = jest.fn();
const findOneSpy = jest.fn();
const updateSpy = jest.fn();
const deleteSpy = jest.fn();
const repoMock = jest.fn().mockReturnValue({
    save: saveSpy,
    find: findSpy,
    findOne: findOneSpy,
    update: updateSpy,
    delete: deleteSpy
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
import ExerciseDB from "../../../api/models/entities/exercise";
import { getFakeExerciseDB, getFakeExercise } from "../test/testUtils";

describe('Typeorm repository', () => {
    const ID_VALUE = 1
    const AN_ID = new ExerciseId(ID_VALUE);
    const sut = new TypeormExerciseRepository();
    const dbExercise: ExerciseDB = getFakeExerciseDB();

    afterEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers()
    })

    describe('create', () => {
        const exercise = getFakeExercise();
        test('Should create an exercise and return the id', async () => {
            const params = {
                name: 'A name',
                description: 'A description',
                difficulty: 5
            }
            const expected = new ExerciseDTO(dbExercise.id, dbExercise.name, dbExercise.description, dbExercise.difficulty);
            saveSpy.mockResolvedValue(dbExercise);

            const actual = await sut.create(exercise);

            expect(saveSpy).toBeCalledWith(params);
            expect(actual).toStrictEqual(expected);
        })

        test('Given an error when accesing repository should throw an exeception', async () => {
            saveSpy.mockRejectedValue(new Error());

            await expect(sut.create(exercise)).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('get all', () => {
        test('Should get all exercises', async () => {
            const exerciseDTO = new ExerciseDTO(dbExercise.id, dbExercise.name, dbExercise.description, dbExercise.difficulty);
            const exerciseDBList = [dbExercise, dbExercise, dbExercise];
            const expected = [exerciseDTO, exerciseDTO, exerciseDTO];
            findSpy.mockResolvedValue(exerciseDBList);

            const actual = await sut.getAll();

            expect(actual).toStrictEqual(expected);
            expect(findSpy).toBeCalledTimes(1);
        })

        test('Given no exercises found should throw an exception', async () => {
            const expected: ExerciseDB[] = [];
            findSpy.mockResolvedValue(expected);

            await expect(sut.getAll()).rejects.toThrowError(new ExercisesNotFound());
        })

        test('Given an error when accesing repository should throw an exeception', async () => {
            findSpy.mockRejectedValue(new Error());

            await expect(sut.getAll()).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('get by id', () => {
        test('Given an id should find a single exercise', async () => {
            const expected = ExerciseDTO.fromDB(dbExercise);
            findOneSpy.mockResolvedValue(dbExercise);

            const actual = await sut.getById(AN_ID);

            expect(actual).toStrictEqual(expected);
            expect(findOneSpy).toBeCalledWith(AN_ID.value);
        })

        test('Given an id should fail when no exercise is found', async () => {
            findOneSpy.mockResolvedValue(undefined);

            await expect(sut.getById(AN_ID)).rejects.toThrowError(new ExerciseNotFound());
        })

        test('Given an error when accesing repositroy should fail', async () => {
            findOneSpy.mockRejectedValue(new Error());

            await expect(sut.getById(AN_ID)).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('update', () => {
        test('Should update an exercise', async () => {
            const params: ExerciseParams = {
                name: new Name('A name'),
                description: new Description('A description'),
                difficutly: new Difficulty(5)
            }

            await sut.update(AN_ID, params);

            expect(updateSpy).toBeCalledWith(AN_ID.value, {
                name: 'A name',
                description: 'A description',
                difficulty: 5
            })
        })

        test('Given no name should update an exercise', async () => {
            const params: ExerciseParams = {
                description: new Description('A description'),
                difficutly: new Difficulty(5)
            }

            await sut.update(AN_ID, params);

            expect(updateSpy).toBeCalledWith(AN_ID.value, {
                description: 'A description',
                difficulty: 5
            })
        })

        test('Given no description should update an exercise', async () => {
            const params: ExerciseParams = {
                name: new Name('A name'),
                description: undefined,
                difficutly: new Difficulty(5)
            }

            await sut.update(AN_ID, params);

            expect(updateSpy).toBeCalledWith(AN_ID.value, {
                name: 'A name',
                difficulty: 5
            })
        })

        test('Given no difficulty should update an exercise', async () => {
            const params: ExerciseParams = {
                name: new Name('A name'),
                description: new Description('A description'),
                difficutly: undefined
            }

            await sut.update(AN_ID, params);

            expect(updateSpy).toBeCalledWith(AN_ID.value, {
                name: 'A name',
                description: 'A description'
            })
        })

        test('Given an error when accesing repositroy should fail', async () => {
            const params: ExerciseParams = {
                name: new Name('A name'),
                description: new Description('A description')
            }
            updateSpy.mockRejectedValue(new Error());

            await expect(sut.update(AN_ID, params)).rejects.toThrowError(new DatabaseFailure());
        })
    })

    describe('delete', () => {
        test('Should delete the exercise for the given id', async () => {
            await sut.delete(AN_ID);

            expect(deleteSpy).toBeCalledWith(AN_ID.value);
        })

        test('Given an error when accessing the repository should fail', async () => {
            deleteSpy.mockRejectedValue(new Error());

            await expect(sut.delete(AN_ID)).rejects.toThrowError(new DatabaseFailure());
        })
    })
})