import bycrypt from 'bcryptjs';
const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
import Password from "./password"
import InvalidPasswordLength from "../errors/invalidPasswordLength";
import InvalidPasswordFormat from "../errors/invalidPasswordFormat";

describe('Password', () => {
    const A_PASSWORD = 'Passw0rd';
    const HASHED_PASSWORD = 'hashedPassw0rd';
    const hashSpy = jest.fn();
    const compareSpy = jest.fn();

    beforeAll(() => {
        bycryptMock.hashSync = hashSpy;
        bycryptMock.compareSync = compareSpy;
    })
    describe('validations', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        })

        test('Given a password should build a password', async () => {
            const sut = new Password(A_PASSWORD);

            expect(sut.value).toBe(A_PASSWORD);
        })

        test('Given a password with less than 8 charactes should fail', () => {
            const fun = () => {
                new Password('foo1234');
            }
            expect(fun).toThrowError(InvalidPasswordLength);
        })
    
        test('Given an empty password should fail', () => {
            const fun = () => {
                new Password('');
            }
            expect(fun).toThrowError(InvalidPasswordLength);
        })
    
        test('Given a password with no numbers should fail', () => {
            const fun = () => {
                new Password('password');
            }
            expect(fun).toThrowError(InvalidPasswordFormat);
        })
    
        test('Given a password with no letter should fail', () => {
            const fun = () => {
                new Password('123456789');
            }
            expect(fun).toThrowError(InvalidPasswordFormat);
        })
    
        it('valid random passwords check', async () => {
            const validPasswords = ['kn3a7ap9', 'fyDfDFE2', 'mJrmg6Ru', 'KVE:Zx7;#7', '/.yf43*EV&q3', 'x7X(9f2Vg]ge6ms', '2YJR8R^f^k43oXn', 'Passw0rd']
    
            for(let index in validPasswords) {
                const sut = new Password(validPasswords[index]);
                
                expect(sut.value).toBe(validPasswords[index]);
            }
        })
    })

    describe('Compare', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        })
        
        test('Given the same password when comparing should success', async () => {
            const hashedPass = HASHED_PASSWORD;
            hashSpy.mockReturnValue(hashedPass);
            compareSpy.mockReturnValueOnce(true);
            const sut = new Password(A_PASSWORD);

            sut.hash();
            const actual = sut.compare(A_PASSWORD);

            expect(actual).toBe(true);
            expect(compareSpy).toBeCalledWith(A_PASSWORD, hashedPass);
        })

        test('Given a different password when comparing should fail', async () => {
            const hashedPass = HASHED_PASSWORD;
            const newPass = 'different';
            hashSpy.mockReturnValue(hashedPass);
            compareSpy.mockReturnValueOnce(false);
            const sut = new Password(A_PASSWORD);

            sut.hash();
            const actual = sut.compare(newPass);

            expect(actual).toBe(false);
            expect(compareSpy).toBeCalledWith(newPass, hashedPass);
        })
    })

    describe('hash', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        })
        
        test('Given a password should encript it', async () => {
            hashSpy.mockReturnValue(HASHED_PASSWORD);
            const sut = new Password(A_PASSWORD);
            
            sut.hash();

            expect(sut.value).toBe(HASHED_PASSWORD);
            expect(hashSpy).toBeCalledWith(A_PASSWORD, 10);
        })
    })
})