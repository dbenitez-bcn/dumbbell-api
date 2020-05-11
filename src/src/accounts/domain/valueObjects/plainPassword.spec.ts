import bycrypt from 'bcryptjs';
const bycryptMock = bycrypt as jest.Mocked<typeof bycrypt>;
import PlainPassword from "./plainPassword"
import InvalidPasswordLength from "../errors/invalidPasswordLength";
import InvalidPasswordFormat from "../errors/invalidPasswordFormat";
import HashedPassword from './hashedPassword';

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
            const sut = new PlainPassword(A_PASSWORD);

            expect(sut.value).toBe(A_PASSWORD);
        })

        test('Given a password with less than 8 charactes should fail', () => {
            const fun = () => {
                new PlainPassword('foo1234');
            }
            expect(fun).toThrowError(InvalidPasswordLength);
        })
    
        test('Given an empty password should fail', () => {
            const fun = () => {
                new PlainPassword('');
            }
            expect(fun).toThrowError(InvalidPasswordLength);
        })
    
        test('Given a password with no numbers should fail', () => {
            const fun = () => {
                new PlainPassword('password');
            }
            expect(fun).toThrowError(InvalidPasswordFormat);
        })
    
        test('Given a password with no letter should fail', () => {
            const fun = () => {
                new PlainPassword('123456789');
            }
            expect(fun).toThrowError(InvalidPasswordFormat);
        })
    
        it('valid random passwords check', async () => {
            const validPasswords = ['kn3a7ap9', 'fyDfDFE2', 'mJrmg6Ru', 'KVE:Zx7;#7', '/.yf43*EV&q3', 'x7X(9f2Vg]ge6ms', '2YJR8R^f^k43oXn', 'Passw0rd']
    
            for(let index in validPasswords) {
                const sut = new PlainPassword(validPasswords[index]);
                
                expect(sut.value).toBe(validPasswords[index]);
            }
        })
    })

    describe('hash', () => {

        afterEach(() => {
            jest.clearAllMocks();
            jest.clearAllTimers();
        })
        
        test('Given a password should encript it', async () => {
            hashSpy.mockReturnValue(HASHED_PASSWORD);
            const expected = new HashedPassword(HASHED_PASSWORD);
            const sut = new PlainPassword(A_PASSWORD);
            
            const result = sut.hash();

            expect(result).toStrictEqual(expected);
            expect(hashSpy).toBeCalledWith(A_PASSWORD, 10);
        })
    })
})