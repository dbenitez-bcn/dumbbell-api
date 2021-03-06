import request from "supertest";
import { isNumber } from "util";
import { getRepository } from "typeorm";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";
import UserAccountDB from "../src/accounts/infrastructure/typeorm/entities/user";
import UserRole from "../src/accounts/domain/valueObjects/userRole";

describe('Exercises e2e', () => {
    const USERNAME_A = 'exerciseUsernameA';
    const USERNAME_B = 'exerciseUsernameB';
    const USERNAME_OPERATOR = 'exerciseUsernameOperator';
    const EMAIL_A = 'exerciseUsernameA@dumbbell.com';
    const EMAIL_B = 'exerciseUsernameB@dumbbell.com';
    const EMAIL_OPERATOR = 'exerciseUsernameOperator@dumbbell.com';
    let app: any;
    let userTokenA: string;
    let userTokenB: string;
    let userTokenOperator: string;

    const exerciseParams = {
        name: 'Test name',
        description: 'Test description',
        difficulty: 5
    };

    beforeAll(async () => {
        app = await startServer();
        userTokenA = await createUser(USERNAME_A, EMAIL_A);
        userTokenB = await createUser(USERNAME_B, EMAIL_B);
        userTokenOperator = await createUser(USERNAME_OPERATOR, EMAIL_OPERATOR);
        updateRoleToOperator(USERNAME_OPERATOR);
    })

    describe('Fetch exercises', () => {
        test('Happy path', async () => {
            const noExercises = await request(app)
                .get(Endpoints.EXERCISES)
                .send();

            expect(noExercises.status).toBe(404);

            await createExerciseAndGetId(exerciseParams, userTokenA);

            const exercisesList = await request(app)
                .get(Endpoints.EXERCISES)
                .send();

            expect(exercisesList.status).toBe(200);
            expect(exercisesList.body.length).toBeGreaterThan(0);
        })
    })

    describe('Fetch one exercise', () => {
        test('Happy path', async () => {
            const id = await createExerciseAndGetId(exerciseParams, userTokenA);
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
                .send(exerciseParams)
                .set('Authorization', `Bearer ${userTokenA}`);

            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test name');
            expect(response.body.description).toBe('Test description');
            expect(response.body.createdBy).toBe(USERNAME_A);
            expect(response.body.difficulty).toBe(5);
            expect(isNumber(response.body.id)).toBe(true);
        })
        describe('Sad path', () => {
            test('Given no token should send a 401 status', async () => {
                const response = await request(app)
                    .post(Endpoints.EXERCISE)
                    .send(exerciseParams);

                expect(response.status).toBe(401);
                expect(response.text).toBe("Invalid or missing token");
            })

            test('Given an invalid name should send a 422 status', async () => {
                const params = {
                    name: '',
                    description: 'Test description',
                    difficulty: 5
                };

                const response = await request(app)
                    .post(Endpoints.EXERCISE)
                    .set('Authorization', `Bearer ${userTokenA}`)
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
                    .set('Authorization', `Bearer ${userTokenA}`)
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
                    .set('Authorization', `Bearer ${userTokenA}`)
                    .send(params);

                expect(response.status).toBe(422);
            })
        })
    })

    describe('Exercise update', () => {
        let id: number;

        beforeAll(async () => {
            id = await createExerciseAndGetId(exerciseParams, userTokenA);
        })
        describe('Happy path', () => {
            test('Given a user that created the exercise should update the exercise', async () => {
                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(exerciseParams)
                    .set('Authorization', `Bearer ${userTokenA}`);

                expect(response.status).toBe(204);
            })

            test('Given a user with operator role that did not creat the exercise should update the exercise', async () => {
                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(exerciseParams)
                    .set('Authorization', `Bearer ${userTokenOperator}`);

                expect(response.status).toBe(204);
            })
        })

        describe('Sad path', () => {
            test('Given no token should send a 401 status', async () => {
                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(exerciseParams);

                expect(response.status).toBe(401);
                expect(response.text).toBe("Invalid or missing token");
            })

            test('Given non existing exercise should send a 404 status', async () => {
                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + 1000)
                    .send(exerciseParams)
                    .set('Authorization', `Bearer ${userTokenA}`);

                expect(response.status).toBe(404);
            })

            test('Given a user that has not created the exercise when tring to update should send an unauthorized response', async () => {
                const params = {
                    name: 'New name',
                    description: 'Test description',
                    difficulty: 5
                };
                const exerciseId = await createExerciseAndGetId(exerciseParams, userTokenA);

                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + exerciseId)
                    .send(params)
                    .set('Authorization', `Bearer ${userTokenB}`);

                expect(response.status).toBe(401);
                expect(response.text).toBe('This action is not allowed.');
            })

            test('Given an invalid name should send a 422 status', async () => {
                const params = {
                    name: '',
                    description: 'Test description',
                    difficulty: 5
                };

                const response = await request(app)
                    .put(Endpoints.EXERCISE + '/' + id)
                    .send(params)
                    .set('Authorization', `Bearer ${userTokenA}`);

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
                    .send(params)
                    .set('Authorization', `Bearer ${userTokenA}`);

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
                    .send(params)
                    .set('Authorization', `Bearer ${userTokenA}`);

                expect(response.status).toBe(422);
            })
        })
    })

    describe('Delete exercise', () => {
        describe('Happy path', () => {
            test('Given an existing id should not fail', async () => {
                const id = await createExerciseAndGetId(exerciseParams, userTokenA);

                const response = await request(app)
                    .delete(Endpoints.EXERCISE + '/' + id)
                    .send()
                    .set('Authorization', `Bearer ${userTokenA}`);

                expect(response.status).toBe(204);
            })

            test('Given a user with operator role that did not creat the exercise should delete the exercise', async () => {
                const id = await createExerciseAndGetId(exerciseParams, userTokenA);

                const deleteResponse = await request(app)
                    .delete(Endpoints.EXERCISE + '/' + id)
                    .send()
                    .set('Authorization', `Bearer ${userTokenOperator}`);
                const getResponse = await request(app)
                    .get(Endpoints.EXERCISE + '/' + id)
                    .send()
                    .set('Authorization', `Bearer ${userTokenOperator}`);

                expect(deleteResponse.status).toBe(204);
                expect(getResponse.status).toBe(404);
            })
        })

        describe('Sad path', () => {
            test('Given no token should send a 401 status', async () => {
                const id = await createExerciseAndGetId(exerciseParams, userTokenA);

                const response = await request(app)
                    .delete(Endpoints.EXERCISE + '/' + id)
                    .send(exerciseParams);

                expect(response.status).toBe(401);
                expect(response.text).toBe("Invalid or missing token");
            })

            test('Given an non existing exercise id should fail', async () => {
                const response = await request(app)
                    .delete(Endpoints.EXERCISE + '/10000')
                    .send()
                    .set('Authorization', `Bearer ${userTokenA}`);

                expect(response.status).toBe(404);
            })

            test('Given a user that has not created the exercise when tring to update should send an unauthorized response', async () => {
                const id = await createExerciseAndGetId(exerciseParams, userTokenA);

                const response = await request(app)
                    .delete(Endpoints.EXERCISE + '/' + id)
                    .send()
                    .set('Authorization', `Bearer ${userTokenB}`);

                expect(response.status).toBe(401);
                expect(response.text).toBe('This action is not allowed.');
            })

            test('Given an invalid exercise id should fail', async () => {
                const response = await request(app)
                    .delete(Endpoints.EXERCISE + '/invalidId')
                    .set('Authorization', `Bearer ${userTokenA}`)
                    .send();

                expect(response.status).toBe(422);
                expect(response.body).not.toBeNull();
            })
        })
    })

    const createExerciseAndGetId = async (params: any, token: string): Promise<number> => {
        const response = await request(app)
            .post(Endpoints.EXERCISE)
            .send(params)
            .set('Authorization', `Bearer ${token}`);

        return response.body.id
    }

    const createUser = async (username: string, email: string): Promise<string> => {
        await request(app)
            .post(Endpoints.REGISTER)
            .send({
                username: username,
                email: email,
                password: 'password1234'
            });

        const response = await request(app)
            .post(Endpoints.LOGIN)
            .send({
                email: email,
                password: 'password1234'
            })

        return response.body.token;
    }

    const updateRoleToOperator = async (username: string) => {
        const repo = getRepository(UserAccountDB);
        const operator = await repo.findOne({
            username: username
        });
        operator!.role = UserRole.OPERATOR;
        repo.save(operator!);
    }
})
