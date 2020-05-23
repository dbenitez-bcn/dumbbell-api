import User from "../aggregates/user";
import Email from "../valueObjects/email";
import HashedPassword from "../valueObjects/hashedPassword";

export default interface UserRepository {
    create(user: User): Promise<void>
    findByEmail(email: Email): Promise<HashedPassword>
}