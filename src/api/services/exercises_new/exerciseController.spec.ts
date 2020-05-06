import { FakeResponseBuilder } from "../../test/testutils";
import ExerciseController from "./exerciseController";
import ExerciseService from "../../../src/exercises/services/exerciseService";
import { Request } from "express";
import InvalidName from "../../../src/exercises/domain/errors/InvalidName";
import InvalidDifficulty from "../../../src/exercises/domain/errors/InvalidDifficulty";
import DatabaseFailure from "../../../src/exercises/domain/errors/DatabaseFailure";
import ExerciseDB from "../../models/entities/exercise";

describe('Exercise controller', () => {
    const AN_ID = 1;
    const A_NAME = 'A name';
    const A_DESCRIPTION = 'A description';
    const A_DIFFICULTY = 5;

    describe('create', () => {
        const statusSpy = jest.fn().mockReturnThis();
        const sendSpy = jest.fn().mockReturnThis();
        const createSpy = jest.fn();
        const body = {
            name: A_NAME,
            description: A_DESCRIPTION,
            difficulty: A_DIFFICULTY
        }
        const exercise = new ExerciseDB();
        const res = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
        const req = { body } as Request
        const service = {
            create: createSpy
        } as unknown as ExerciseService<ExerciseDB>;

        const sut = new ExerciseController(service);

        afterEach(() => {
            jest.clearAllMocks()
            jest.clearAllTimers()
        })

        test('Should create an exercise and return the id', async () => {
            createSpy.mockResolvedValue(exercise);

            await sut.create(req, res);

            expect(statusSpy).toBeCalledWith(201);
            expect(sendSpy).toBeCalledWith(exercise);
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
})