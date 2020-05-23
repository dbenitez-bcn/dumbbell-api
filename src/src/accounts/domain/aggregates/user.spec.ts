import User from "./user"
import PlainPassword from "../valueObjects/plainPassword";
import HashedPassword from "../valueObjects/hashedPassword";
import UserRole from "../valueObjects/userRole";

describe('User', () => {
    test('Should change the password when hashed', () => {
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'));

        expect(sut.password).toBeInstanceOf(PlainPassword);
        sut.hashPassword();
        
        expect(sut.password).toBeInstanceOf(HashedPassword);
    })

    test('Should hash just one time', () => {
        const hashSpy = jest.spyOn(PlainPassword.prototype, 'hash');
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'));

        sut.hashPassword();
        sut.hashPassword();
        sut.hashPassword();

        expect(hashSpy).toReturnTimes(1);
    })

    test('Given no role should use user role by default', () => {
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'));

        expect(sut.role).toBe(UserRole.USER);
    })

    test('Given role should use the given role', () => {
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'), UserRole.OPERATOR);

        expect(sut.role).toBe(UserRole.OPERATOR);
    })
})