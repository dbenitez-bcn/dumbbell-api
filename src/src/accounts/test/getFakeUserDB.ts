import UserDB from "../infrastructure/typeorm/entities/user"

export const getFakeUserDB = () => {
    const user = new UserDB();
    user.username = 'username';
    user.email = 'user@dumbbell.com';
    user.password = 'password1234';

    return user;
}