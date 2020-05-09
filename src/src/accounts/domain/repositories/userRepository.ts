import User from "../aggregates/user";

export default interface UserRepository {
    register(user: User): Promise<void>
}