import UserDB from "../infrastructure/typeorm/entities/user";

export const getFakeUserDB = () => {
    const user = new UserDB();
    user.id = "123";
    user.username = "username";

    return user;
}