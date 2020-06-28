import UserAccountDB from "../infrastructure/typeorm/entities/user"
import UserRole from "../domain/valueObjects/userRole";

export const getFakeUserDB = () => {
    const user = new UserAccountDB();
    user.username = 'username';
    user.email = 'user@dumbbell.com';
    user.password = 'password1234';
    user.role = UserRole.USER;

    return user;
}