import User from "../aggregates/user";
import Email from "../valueObjects/email";
import Username from "../valueObjects/username";

export default interface AccountRepository {
    create(user: User): Promise<User>
    findByEmail(email: Email): Promise<User>
    findByUsername(username: Username): Promise<User>
}