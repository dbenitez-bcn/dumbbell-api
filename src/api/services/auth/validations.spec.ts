import { parseLoginBody } from "./validations";
import { Constants } from "../../config/constants";

describe('Auth validations', () => {
    describe('login', () => {
        test('Given an email and a password should build a LoginRequest', async () =>  {
            const body = {
                email: 'valid@email.com',
                password: 'password'
            }

            const request = await parseLoginBody(body);

            expect(request.email).toBe('valid@email.com');
            expect(request.password).toBe('password');
        })

        describe('email validations', () => {
            test('Given an empty email should thorw an error', async () =>  {
                const body = {
                    email: '',
                    password: 'password'
                }
    
                await expect(parseLoginBody(body)).rejects.toThrowError(new Error(Constants.MISSING_EMAIL));
            })
            test('Given an invalid email should thorw an error', async () =>  {
                const body = {
                    email: 'invalid.com',
                    password: 'password'
                }
    
                await expect(parseLoginBody(body)).rejects.toThrowError(new Error(Constants.INVALID_EMAIL_PARAM));
            })
        })

        describe('password validations', () => {
            test('Given an empty password should throw an errow', async () => {
                const body = {
                    email: 'test@valid.com',
                    password: ''
                }
    
                await expect(parseLoginBody(body)).rejects.toThrowError(new Error(Constants.MISSING_PASSWORD));
            })
        })
    })
})