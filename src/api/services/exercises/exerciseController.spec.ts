import { FakeResponseBuilder } from "../../test/testutils";
import ExerciseController from "./exerciseController";
import ExerciseService from "../../../src/exercises/services/exerciseService";
import { Request } from "express";
import InvalidName from "../../../src/exercises/domain/errors/InvalidName";
import InvalidDifficulty from "../../../src/exercises/domain/errors/InvalidDifficulty";
import DatabaseFailure from "../../../src/exercises/domain/errors/DatabaseFailure";
import ExerciseDB from "../../models/entities/exercise";
import ExercisesNotFound from "../../../src/exercises/domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../../../src/exercises/domain/errors/ExerciseNotFound";
import InvalidExerciseId from "../../../src/exercises/domain/errors/InvalidExerciseId";

describe('Exercise controller', () => {
    const AN_ID = 1;
    const A_NAME = 'A name';
    const A_DESCRIPTION = 'A description';
    const A_DIFFICULTY = 5;
    const AN_EXERCISE_DB = new ExerciseDB();

    const statusSpy = jest.fn().mockReturnThis();
    const sendSpy = jest.fn().mockReturnThis();
    const createSpy = jest.fn();
    const getAllSpy = jest.fn();
    const getByIdSpy = jest.fn();
    const updateSpy = jest.fn();
    const deleteSpy = jest.fn();

    const res = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
    const service = {
        create: createSpy,
        getAll: getAllSpy,
        getById: getByIdSpy,
        update: updateSpy,
        delete: deleteSpy
    } as unknown as ExerciseService<ExerciseDB>;

    const sut = new ExerciseController(service);

    describe('create', () => {
        const body = {
            name: A_NAME,
            description: A_DESCRIPTION,
            difficulty: A_DIFFICULTY
        }
        const req = { body } as Request;

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Should create an exercise and return the id', async () => {
            createSpy.mockResolvedValue(AN_EXERCISE_DB);

            await sut.create(req, res);
            
            expect(createSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(201);
            expect(sendSpy).toBeCalledWith(AN_EXERCISE_DB);
        })

        test('Given a invalid name error should fail', async () => {
            const error = new InvalidName();
            createSpy.mockRejectedValue(error);

            await sut.create(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a invalid description error should fail', async () => {
            const error = new InvalidDifficulty();
            createSpy.mockRejectedValue(error);

            await sut.create(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a invalid difficulty error should fail', async () => {
            const error = new InvalidDifficulty();
            createSpy.mockRejectedValue(error);

            await sut.create(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a failure should fail', async () => {
            const error = new DatabaseFailure();
            createSpy.mockRejectedValue(error);

            await sut.create(req, res);

            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })

    describe('get all', () => {
        const req = { } as Request;

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('should return a list of exercises', async () => {
            const exercisesList = [AN_EXERCISE_DB, AN_EXERCISE_DB, AN_EXERCISE_DB];
            getAllSpy.mockResolvedValue(exercisesList);

            await sut.getAll(req, res);

            expect(getAllSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(200);
            expect(sendSpy).toBeCalledWith(exercisesList);
        })

        test('Given no exercises found should fail', async () => {
            const error = new ExercisesNotFound();
            getAllSpy.mockRejectedValue(error);

            await sut.getAll(req, res);

            expect(getAllSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(404);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a failure should fail', async () => {
            const error = new DatabaseFailure();
            getAllSpy.mockRejectedValue(error);

            await sut.getAll(req, res);

            expect(getAllSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })

    describe('get by id', () => {
        const params = {
            id: AN_ID
        }
        const req = { params } as unknown as Request;

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Should return a single exercise', async () => {
            getByIdSpy.mockResolvedValue(AN_EXERCISE_DB);

            await sut.getById(req, res);

            expect(getByIdSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(200);
            expect(sendSpy).toBeCalledWith(AN_EXERCISE_DB)
        })

        test('Given no exercises found should fail', async () => {
            const error = new ExerciseNotFound();
            getByIdSpy.mockRejectedValue(error);

            await sut.getById(req, res);

            expect(getByIdSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(404);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given invalid id should fail', async () => {
            const error = new InvalidExerciseId();
            getByIdSpy.mockRejectedValue(error);

            await sut.getById(req, res);

            expect(getByIdSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a failure should fail', async () => {
            const error = new DatabaseFailure();
            getByIdSpy.mockRejectedValue(error);

            await sut.getById(req, res);

            expect(getByIdSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })

    describe('update', () => {
        const params = {
            id: AN_ID
        }
        const body = {
            name: A_NAME,
            description: A_DESCRIPTION,
            difficulty: A_DIFFICULTY
        }
        const req = { params, body } as unknown as Request;

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Given an id should update the exercise', async () => {
            await sut.update(req, res);

            expect(updateSpy).toBeCalledWith(AN_ID, A_NAME, A_DESCRIPTION, A_DIFFICULTY);
            expect(statusSpy).toBeCalledWith(204);
            expect(sendSpy).toBeCalledTimes(1);
        })

        test('Given invalid id should fail', async () => {
            const error = new InvalidExerciseId();
            updateSpy.mockRejectedValue(error);

            await sut.update(req, res);

            expect(updateSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a failure should fail', async () => {
            const error = new DatabaseFailure();
            updateSpy.mockRejectedValue(error);

            await sut.update(req, res);

            expect(updateSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a invalid name error should fail', async () => {
            const error = new InvalidName();
            updateSpy.mockRejectedValue(error);

            await sut.update(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a invalid description error should fail', async () => {
            const error = new InvalidDifficulty();
            updateSpy.mockRejectedValue(error);

            await sut.update(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a invalid difficulty error should fail', async () => {
            const error = new InvalidDifficulty();
            updateSpy.mockRejectedValue(error);

            await sut.update(req, res);

            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })


    describe('delete', () => {
        const params = {
            id: AN_ID
        }
        const req = { params } as unknown as Request;

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Should delete a single exercise', async () => {
            await sut.delete(req, res);

            expect(deleteSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(204);
            expect(sendSpy).toBeCalledWith();
        })

        test('Given invalid id should fail', async () => {
            const error = new InvalidExerciseId();
            deleteSpy.mockRejectedValue(error);

            await sut.delete(req, res);

            expect(deleteSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(422);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given a failure should fail', async () => {
            const error = new DatabaseFailure();
            deleteSpy.mockRejectedValue(error);

            await sut.delete(req, res);

            expect(deleteSpy).toBeCalledTimes(1);
            expect(statusSpy).toBeCalledWith(500);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })
})