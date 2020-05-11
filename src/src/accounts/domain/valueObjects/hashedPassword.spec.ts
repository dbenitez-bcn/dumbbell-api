import bycrypt from 'bcryptjs';
const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
import HashedPassword from './hashedPassword';

describe('Password', () => {
    const A_PASSWORD = 'Passw0rd';
    const HASHED_PASSWORD = 'hashedPassw0rd';
    const compareSpy = jest.fn();

    beforeAll(() => {
        bycryptMock.compareSync = compareSpy;
    })
    describe('Compare', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        })

        test('Given the same password when comparing should success', async () => {
            compareSpy.mockReturnValueOnce(true);
            const sut = new HashedPassword(HASHED_PASSWORD);

            const actual = sut.compare(A_PASSWORD);

            expect(actual).toBe(true);
            expect(compareSpy).toBeCalledWith(A_PASSWORD, HASHED_PASSWORD);
        })

        test('Given a different password when comparing should fail', async () => {
            const newPass = 'different';
            compareSpy.mockReturnValueOnce(false);
            const sut = new HashedPassword(HASHED_PASSWORD);

            const actual = sut.compare(newPass);

            expect(actual).toBe(false);
            expect(compareSpy).toBeCalledWith(newPass, HASHED_PASSWORD);
        })
    })
})