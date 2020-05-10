import Password from "./password"
import InvalidPasswordLength from "../errors/invalidPasswordLength";
import InvalidPasswordFormat from "../errors/invalidPasswordFormat";

describe('Password', () => {
    test('Given a valid password should build the value object', () => {
        const sut = new Password('Pass1234!@#$%^&*');

        expect(sut.value).toBe('Pass1234!@#$%^&*');
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