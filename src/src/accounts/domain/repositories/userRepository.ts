import User from "../aggregates/user";
import Email from "../valueObjects/email";
import HashedPassword from "../valueObjects/hashedPassword";

export default interface UserRepository {
    register(user: User): Promise<void>
    login(email: Email): Promise<HashedPassword>
}