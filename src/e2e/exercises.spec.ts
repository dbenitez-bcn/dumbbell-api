import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";
import { isNumber } from "util";

describe('Exercises e2e', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })
    describe('Exercise creation', () => {
        test('Happy path', async () => {
            const params = {
                name: 'Test name',
                description: 'Test description',
                difficulty: 5
            };

            const response = await request(app)
                .post(Endpoints.EXERCISE)
                .send(params);

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
})