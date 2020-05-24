import User from "../domain/aggregates/user";

export const getFakeUser = () => {
    return User.newUser('username', 'test@dumbbell.com', 'password1234');
}