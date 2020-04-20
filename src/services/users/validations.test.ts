import { Constants } from "../../config/constants";
import { parseUserRegistrationBody } from "./validations";

describe('Validations', () => {
    describe('User registration', () => {
        it('should create a request object from a request body', async () => {
            const body = {
                username: 'Username_1',
                email: 'testerino@dumbbell.com',
                password: 'pass1234'
            }
            const request = await parseUserRegistrationBody(body);

            expect(request.username).toBe('Username_1');
            expect(request.email).toBe('testerino@dumbbell.com');
            expect(request.password).toBe('pass1234');
        })
        describe('username validations', () => {
            it('should not create a request object when the username has less than 4 characters', async () => {
                const body = {
                    username: 'foo',
                    email: 'testerino@dumbbell.com',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_USERNAME_LENGTH))
            })
            it('should not create a request object when the username is empty', async () => {
                const body = {
                    username: '',
                    email: 'testerino@dumbbell.com',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_USERNAME_LENGTH))
            })

            it('should not create a request object when the username has special characters', async () => {
                const body = {
                    username: '@username',
                    email: 'testerino@dumbbell.com',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_USERNAME_CHARACTERS))
            })

            it('should not create a request object when the username has spaces', async () => {
                const body = {
                    username: 'foo fiiz',
                    email: 'testerino@dumbbell.com',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_USERNAME_CHARACTERS))
            })
        })

        describe('email validation', () => {
            it('should not create a request object when email is invalid', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'invalidemail.com',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_EMAIL_PARAM))
            })
            it('should not create a request object when email is empty', async () => {
                const body = {
                    username: 'Username_1',
                    email: '',
                    password: 'pass1234'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_EMAIL_PARAM))
            })
        })

        describe('password validation', () => {
            it('should create a request object when password hasspecial characters', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'testerino@dumbbell.com',
                    password: 'Pass1234!@#$%^&*'
                }
                const request = await parseUserRegistrationBody(body);
    
                expect(request.username).toBe('Username_1');
                expect(request.email).toBe('testerino@dumbbell.com');
                expect(request.password).toBe('Pass1234!@#$%^&*');
            })
            it('should not create a request object when password has less than 8 characters', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'testerino@dumbbell.com',
                    password: 'pass1'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_PASSWORD_LENGTH))
            })
            it('should not create a request object when password is empty', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'testerino@dumbbell.com',
                    password: ''
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_PASSWORD_FORMAT))
            })
            it('should not create a request object when password has no numbers', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'testerino@dumbbell.com',
                    password: 'Password'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_PASSWORD_FORMAT))
            })
            it('should not create a request object when password has no characters', async () => {
                const body = {
                    username: 'Username_1',
                    email: 'testerino@dumbbell.com',
                    password: '12345678'
                }

                await expect(parseUserRegistrationBody(body)).rejects.toThrowError(new Error(Constants.INVALID_PASSWORD_FORMAT))
            })
        })
    })
})