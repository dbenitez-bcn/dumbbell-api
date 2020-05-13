import Username from "./username";
import InvalidUsernameLength from "../errors/invalidUsername";
import InvalidUsernameFormat from "../errors/invalidUsernameFormat";

describe('Username', () => {
    test('Given a valid username should success', () => {
        const sut = new Username('testerino_123');
        
        expect(sut.value).toBe('testerino_123');
    })

    test('Given a username with less than 4 should fail', () => {
        const fun = () => {
            new Username('foo');
        }
        expect(fun).toThrowError(InvalidUsernameLength);
    })

    test('Given an empty username should fail', () => {
        const fun = () => {
            new Username('');
        }
        expect(fun).toThrowError(InvalidUsernameLength);
    })

    test('Given a username with special characters should fail', () => {
        const fun = () => {
            new Username('@username!');
        }
        expect(fun).toThrowError(InvalidUsernameFormat);
    })

    test('Given a username with blank spaces characters should fail', () => {
        const fun = () => {
            new Username('user name');
        }
        expect(fun).toThrowError(InvalidUsernameFormat);
    })

    it('valid random username check', async () => {
        const validUsernames = ['0tMctey-', '-jfUxy6K', '5dfGfECpbZ4gppg', 'k8ZK_qh4d', 'YnCt-NqDq3', '_t9aFe6nc', 'D3lt4_']

        for(let index in validUsernames) {
            const sut = new Username(validUsernames[index]);
            
            expect(sut.value).toBe(validUsernames[index]);
        }
    })
})