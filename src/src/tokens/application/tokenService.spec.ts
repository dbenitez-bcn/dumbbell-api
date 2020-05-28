const verify = jest.fn();
jest.mock("jsonwebtoken", () => ({
    verify
}))
import TokenService from "./tokenService";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

describe('Token service', () => {
    describe('getTokenDataFromBaerer', () => {
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
            const token = 'Baerer aToken';

            const result = sut.getTokenDataFromBaerer(token);

            expect(result).toBe(expectedData);
            expect(verify).toBeCalledWith('aToken', Secrets.JWT_SCRET);
        });

        test('Given a invalid token should fail', () => {
            verify.mockImplementation(() => {
                throw new Error();
            });
            const sut = new TokenService();
            const token = 'Baerer aToken';

            const fun = () => { sut.getTokenDataFromBaerer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).toBeCalledWith('aToken', Secrets.JWT_SCRET);
        });

        test('Given a invalid baerer syntax should fail', () => {
            const sut = new TokenService();
            const token = 'aToken';

            const fun = () => { sut.getTokenDataFromBaerer(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).not.toBeCalled();
        });
    })
})