import User from "../aggregates/user";
import Email from "../valueObjects/email";
import Password from "../valueObjects/password";

export default interface UserRepository {
    register(user: User): Promise<void>
    login(email: Email): Promise<Password>
}