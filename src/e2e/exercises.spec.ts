import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";
import { isNumber } from "util";

describe('Exercises e2e', () => {
    let app: any;

    const exerciseParams = {
        name: 'Test name',
        description: 'Test description',
        difficulty: 5
    };

    beforeAll(async () => {
        app = await startServer();
    })

    describe('Fetch exercises', () => {
        test('Happy path', async () => {
            const noExercises = await request(app)
                .get(Endpoints.EXERCISES)
                .send();

            expect(noExercises.status).toBe(404);

            await createExerciseAndGetId(exerciseParams);

            const exercisesList = await request(app)
                .get(Endpoints.EXERCISES)
                .send();

            expect(exercisesList.status).toBe(200);
            expect(exercisesList.body.length).toBeGreaterThan(0);
        })
    })

    describe('Fetch one exercise', () => {
        test('Happy path', async () => {
            const id = await createExerciseAndGetId(exerciseParams);
            const response = await request(app)
                .get(Endpoints.EXERCISE + '/' + id)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).not.toBeNull();
        })
        test('Sad path', async () => {
            const response = await request(app)
                .get(Endpoints.EXERCISE + '/1000')
                .send();

            expect(response.status).toBe(404);
            expect(response.body).not.toBeNull();
        })
    })

    describe('Exercise creation', () => {
        test('Happy path', async () => {
            const response = await request(app)
                .post(Endpoints.EXERCISE)
                .send(exerciseParams);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test name');
            expect(response.body.description).toBe('Test description');
            expect(response.body.difficulty).toBe(5);
            expect(isNumber(response.body.id)).toBe(true);
        })
        describe('Sad path', () => {
            test('Given an invalid name should send a 422 status', async () => {
                const params = {
                    name: '',
                    description: 'Test description',
                    difficulty: 5
                };

                const response = await request(app)
                    .post(Endpoints.EXERCISE)
                    .send(params);

                expect(response.status).toBe(422);
            })

            test('Given an invalid description should send a 422 status', async () => {
                const params = {
                    name: 'Test name',
                    difficulty: 5
                };

                const response = await request(app)
                    .post(Endpoints.EXERCISE)
                    .send(params);

                expect(response.status).toBe(422);
            })

            test('Given an invalid difficulty should send a 422 status', async () => {
                const params = {
                    name: 'Test name',
                    description: 'Test description',
                    difficulty: 100
                };

                const response = await request(app)
                    .post(Endpoints.EXERCISE)
                    .send(params);

                expect(response.status).toBe(422);
            })
        })
    })

    describe('Exercise update', () => {
        let id: number;

        beforeAll(async () => {
            id = await createExerciseAndGetId(exerciseParams);
        })

        test('Happy path', async () => {
            const response = await request(app)
                .put(Endpoints.EXERCISE + '/' + id)
                .send(exerciseParams);

            expect(response.status).toBe(204);
        })

        describe('Sad path', () => {
            test('Given an invalid name should send a 422 status', async () => {
                const params = {
                    name: '',
                    description: 'Test description',
                    difficulty: 5
                };

                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(params);

                expect(response.status).toBe(422);
            })

            test('Given an invalid description should send a 422 status', async () => {
                const params = {
                    name: 'Test name',
                    description: '',
                    difficulty: 5
                };

                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(params);

                expect(response.status).toBe(422);
            })

            test('Given an invalid difficulty should send a 422 status', async () => {
                const params = {
                    name: 'Test name',
                    description: 'Test description',
                    difficulty: 100
                };

                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(params);

                expect(response.status).toBe(422);
            })
        })
    })

    describe('Delete exercise', () => {
        test('Happy path', async () => {
            const id = await createExerciseAndGetId(exerciseParams);

            const response = await request(app)
                .delete(Endpoints.EXERCISE + '/' + id)
                .send();

            expect(response.status).toBe(204);
        })

        test('Sad path', async () => {
            const response = await request(app)
                .get(Endpoints.EXERCISE + '/1000')
                .send();

            expect(response.status).toBe(404);
            expect(response.body).not.toBeNull();
        })
    })

    const createExerciseAndGetId = async (params: any): Promise<number> => {
        const response = await request(app)
            .post(Endpoints.EXERCISE)
            .send(params);

        return response.body.id
    }
})
