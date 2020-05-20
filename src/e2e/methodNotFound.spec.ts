import request from "supertest";
import { startServer } from "../api/server";

describe('Method not found', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })

    test('Given a non existing enpoint should return a not found method', async () => {
        const response = await request(app)
        .post("/fakeEndpoint")
        .send()

        expect(response.status).toBe(404)
        expect(response.text).toBe("Method not found.");
    })
})