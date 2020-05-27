const verify = jest.fn();
jest.mock("jsonwebtoken", () => ({
    verify
}))
import TokenService from "./tokenService";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

describe('Token service', () => {
    describe('getData', () => {
        test('Given a valid token should the data inside', () => {
            const expectedData = {
                username: 'testerino',
                role: 'user'
            }
            verify.mockReturnValue(expectedData);
            const sut = new TokenService();
            const token = 'aToken';

            const result = sut.getData(token);

            expect(result).toBe(expectedData);
            expect(verify).toBeCalledWith(token, Secrets.JWT_SCRET);
        });

        test('Given a invalid token should fail', () => {
            verify.mockImplementation(() => {
                throw new Error();
            });
            const sut = new TokenService();
            const token = 'aToken';

            const fun = () => { sut.getData(token); }

            expect(fun).toThrow(InvalidToken);
            expect(verify).toBeCalledWith(token, Secrets.JWT_SCRET);
        });
    })
})