import request from "supertest";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";

describe('Users e2e', () => {
    let app: any;

    beforeAll(async () => {
        app = await startServer();
    })

    describe('User registration', () => {
        test('Happy path', async () => {
            const params = {
                username: 'username',
                email: 'test@dumbbell.com',
                password: 'password1234'
            }

            const response = await request(app)
                .post(Endpoints.REGISTER)
                .send(params);

            expect(response.status).toBe(201);
            expect(response.body).not.toBeNull();
        })
        describe('Sad path', () => {
            test('Given an existing username should fail', async () => {
                const params = {
                    username: 'username',
                    email: 'test@dumbbell.com',
                    password: 'password1234'
                }
    
                const response = await request(app)
                    .post(Endpoints.REGISTER)
                    .send(params);
    
                expect(response.status).toBe(409);
                expect(response.body).not.toBeNull();
            })   
            test('Given an existing email should fail', async () => {
                const params = {
                    username: 'username2',
                    email: 'test@dumbbell.com',
                    password: 'password1234'
                }
    
                const response = await request(app)
                    .post(Endpoints.REGISTER)
                    .send(params);
    
                expect(response.status).toBe(409);
                expect(response.body).not.toBeNull();
            })   
            test('Given an invalid password should fail', async () => {
                const params = {
                    username: 'username2',
                    email: 'test2@dumbbell.com',
                    password: 'pass'
                }
    
                const response = await request(app)
                    .post(Endpoints.REGISTER)
                    .send(params);
    
                expect(response.status).toBe(422);
                expect(response.body).not.toBeNull();
            })            
        })
    })
})