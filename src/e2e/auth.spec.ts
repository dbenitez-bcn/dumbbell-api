import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";

describe('Auth e2e', () => {
    const AN_EMAIL = 'qwerty@dumbbell.com';
    const A_PASSWORD = 'password1234';

    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })

    describe('Users authentication', () => {
        beforeAll(async () => {
            await registerUser();
        })

        test('Happy path', async () => {
            const response = await request(app)
            .post(Endpoints.LOGIN)
            .send({
                email: AN_EMAIL,
                password: A_PASSWORD
            })

            expect(response.status).toBe(200)
            expect(response.body).not.toBeNull();
        })

        describe('Sad path', () => {
            test('Given non existing email should fail', async () => {
                const response = await request(app)
                .post(Endpoints.LOGIN)
                .send({
                    email: 'fake@email.com',
                    password: A_PASSWORD
                })
    
                expect(response.status).toBe(404)
                expect(response.body).not.toBeNull();
            })

            test('Given invalid password for email should fail', async () => {
                const response = await request(app)
                .post(Endpoints.LOGIN)
                .send({
                    email: AN_EMAIL,
                    password: 'qwerty1234'
                })
    
                expect(response.status).toBe(401)
                expect(response.body).not.toBeNull();
            })
        })
    })

    const registerUser = async () => {
        await request(app)
        .post(Endpoints.REGISTER)
        .send({
            username: 'qwerty',
            email: AN_EMAIL,
            password: A_PASSWORD
        })
    }
})