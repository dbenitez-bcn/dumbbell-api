import User from "../aggregates/user";
import Email from "../valueObjects/email";

export default interface UserRepository {
    create(user: User): Promise<void>
    findByEmail(email: Email): Promise<User>
}