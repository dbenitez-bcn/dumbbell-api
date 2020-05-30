import "reflect-metadata";
const sign = jest.fn().mockReturnValue('token');
const verify = jest.fn();
jest.mock("jsonwebtoken", () => ({
    verify,
    sign
}))
import TokenService from "./tokenService";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

describe('Token service', () => {
    describe('generateToken', () => {
        test('Given a user should generate a token', () => {
            const sut = new TokenService();
            const A_USERNAME = 'username';

            const token = sut.generateToken(A_USERNAME);

            expect(sign).toBeCalledWith({
                username: A_USERNAME
            }, Secrets.JWT_SCRET);
            expect(token).toBe('token');
        })
    })
    
    describe('getTokenDataFromBearer', () => {
        afterEach(() => {
            jest.clearAllTimers();
            jest.clearAllMocks();
        })

        test('Given a valid token should the data inside', () => {
            const expectedData = {
                username: 'testerino'
            }
            verify.mockReturnValue(expectedData);
            const sut = new TokenService();
            const token = 'Bearer aToken';

            const result = sut.getTokenDataFromBearer(token);

            expect(result).toBe(expectedData);
            expect(verify).toBeCalledWith('aToken', Secrets.JWT_SCRET);
        });

        test('Given a invalid token should fail', () => {
            verify.mockImplementation(() => {
                throw new Error();
            });
            const sut = new TokenService();
            const token = 'Bearer aToken';

            const fun = () => { sut.getTokenDataFromBearer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).toBeCalledWith('aToken', Secrets.JWT_SCRET);
        });

        test('Given a invalid bearer syntax should fail', () => {
            const sut = new TokenService();
            const token = 'aToken';

            const fun = () => { sut.getTokenDataFromBearer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).not.toBeCalled();
        });

        test('Given a invalid bearer format should fail', () => {
            const sut = new TokenService();
            const token = 'Bearerino aToken';

            const fun = () => { sut.getTokenDataFromBearer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).not.toBeCalled();
        });

        test('Given an empty bearer should fail', () => {
            const sut = new TokenService();
            const token = '';

            const fun = () => { sut.getTokenDataFromBearer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).not.toBeCalled();
        });
    })
})