import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";

export default class AccountService {
    constructor(private repository: UserRepository) { }

    async register(username: string, email: string, password: string) {
        const user = new User(username, email, password);
        await this.repository.register(user);
    }
}