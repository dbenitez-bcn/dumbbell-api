import User from "./user"
import PlainPassword from "../valueObjects/plainPassword";
import HashedPassword from "../valueObjects/hashedPassword";
import UserRole from "../valueObjects/userRole";

describe('User', () => {
    test('Should change the password when hashed', () => {
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'), UserRole.USER);

        expect(sut.password).toBeInstanceOf(PlainPassword);
        sut.hashPassword();
        
        expect(sut.password).toBeInstanceOf(HashedPassword);
    })

    test('Should hash just one time', () => {
        const hashSpy = jest.spyOn(PlainPassword.prototype, 'hash');
        const sut = new User('username', 'test@dumbbell.com', new PlainPassword('password1234'), UserRole.USER);

        sut.hashPassword();
        sut.hashPassword();
        sut.hashPassword();

        expect(hashSpy).toReturnTimes(1);
    })

    test('Should create a new user with user role and plain password', () => {
        const sut = User.newUser('username', 'test@dumbbell.com', 'password1234');

        expect(sut.role).toBe(UserRole.USER);
        expect(sut.password).toBeInstanceOf(PlainPassword);
    })
})