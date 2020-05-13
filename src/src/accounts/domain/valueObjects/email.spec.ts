import Email from "./email"
import InvalidEmail from "../errors/invalidEmail";

describe('Email', () => {
    test('Given a valid email should build the value object', () => {
        const sut = new Email('test@dumbbell.com');

        expect(sut.value).toBe('test@dumbbell.com');
    })

    test('Given an invalid email should fail', () => {
        const fun = () => {
            new Email('foo.bar');
        }
        expect(fun).toThrowError(InvalidEmail);
    })

    test('Given an invalid email should fail', () => {
        const fun = () => {
            new Email('foo@bar.i');
        }
        expect(fun).toThrowError(InvalidEmail);
    })

    test('Given an empty email should fail', () => {
        const fun = () => {
            new Email('');
        }
        expect(fun).toThrowError(InvalidEmail);
    })

    it('valid random email check', async () => {
        const validEmails = ['snouss@macosa.tkj', 'cbid.ox397k@edaned.tk', 'wheartb@ble.ederas.gq', 'abrarhossainnah9@imbuyba.gaa']

        for(let index in validEmails) {
            const sut = new Email(validEmails[index]);
            
            expect(sut.value).toBe(validEmails[index]);
        }
    })
})