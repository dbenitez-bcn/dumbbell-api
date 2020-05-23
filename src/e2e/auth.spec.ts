import request from "supertest";
import { getRepository } from "typeorm";
import { startServer } from "../api/server";
import { Endpoints } from "../api/config/constants";
import UserDB from "../src/accounts/domain/typeormEntities/user";
import UserRole from "../src/accounts/domain/valueObjects/userRole";

describe('Auth e2e', () => {
    const USER_USERNAME = 'qwerty';
    const USER_EMAIL = 'qwerty@dumbbell.com';
    const OPERATOR_USERNAME = 'operator';
    const OPERATOR_EMAIL = 'operator@dumbbell.com';
    const A_PASSWORD = 'password1234';

    let app: any;

    beforeAll(async () => {
        app = await startServer();
        await registerUser();
        await registerOperator();
    })

    describe('Users authentication', () => {

        test('Happy path', async () => {
            const response = await request(app)
            .post(Endpoints.LOGIN)
            .send({
                email: USER_EMAIL,
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
                    email: USER_EMAIL,
                    password: 'qwerty1234'
                })
    
                expect(response.status).toBe(401)
                expect(response.body).not.toBeNull();
            })
        })
    })

    describe('Users authentication in admin panel', ()=> {

    })

    const registerUser = async () => {
        await request(app)
        .post(Endpoints.REGISTER)
        .send({
            username: USER_USERNAME,
            email: USER_EMAIL,
            password: A_PASSWORD
        })
    }

    const registerOperator = async () => {
        await request(app)
        .post(Endpoints.REGISTER)
        .send({
            username: OPERATOR_USERNAME,
            email: OPERATOR_EMAIL,
            password: A_PASSWORD
        })
        await updateRoleToOperator(OPERATOR_USERNAME);
    }

    const updateRoleToOperator = async (username: string) => {
        const repo = getRepository(UserDB);
        const operator = await repo.findOne({
            username: username
        });
        operator!.role = UserRole.OPERATOR;
        repo.save(operator!);
    }
})