import User from "./user"
import PlainPassword from "../valueObjects/plainPassword";
import HashedPassword from "../valueObjects/hashedPassword";

describe('User', () => {
    test('Should change the password when hashed', () => {
        const sut = new User('username', 'test@dumbbell.com', 'password1234');

        expect(sut.password).toBeInstanceOf(PlainPassword);
        sut.hashPassword();
        
        expect(sut.password).toBeInstanceOf(HashedPassword);
    })
})