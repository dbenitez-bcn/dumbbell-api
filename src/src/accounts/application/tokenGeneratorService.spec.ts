const sign = jest.fn().mockReturnValue('token');
jest.mock("jsonwebtoken", () => ({
    sign
}))
import { getFakeUser } from "../test/testUtils";
import Secrets from "../../../api/config/secrets";
import TokenService from "./tokenGeneratorService";

describe('Token generator service', () => {
    beforeAll(() => {
    })
    describe('generateTokenFor', () => {
        test('Given a user should generate a token', () => {
            const user = getFakeUser();
            const sut = new TokenService();

            const token = sut.generateTokenFor(user);

            expect(sign).toBeCalledWith({
                username: user.username.value,
                role: user.role
            }, Secrets.JWT_SCRET);
            expect(token).toBe('token');
        })
    })
})