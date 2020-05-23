import User from "../domain/aggregates/user"
import PlainPassword from "../domain/valueObjects/plainPassword"

export const getFakeUser = () => {
    return new User('username', 'test@dumbbell.com', new PlainPassword('password1234'));
}