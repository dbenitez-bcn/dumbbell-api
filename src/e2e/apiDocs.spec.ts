import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";

describe('Api docs', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })

    test('Happy path', async () => {
        const response = await request(app)
        .post(Endpoints.API_DOCS)
        .send()

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    })
})