import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";
import { isNumber } from "util";

describe('Exercises e2e', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })

    test('Should success', () => {
        expect(true).toBeTruthy();
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
    })
})