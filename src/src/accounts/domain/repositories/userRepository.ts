import User from "../aggregates/user";
import Email from "../valueObjects/email";
import Username from "../valueObjects/username";

export default interface UserRepository {
    create(user: User): Promise<void>
    findByEmail(email: Email): Promise<User>
    findByUsername(username: Username): Promise<User>
}