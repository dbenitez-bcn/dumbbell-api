import { injectable, inject } from "inversify";
import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";
import Email from "../domain/valueObjects/email";
import LoginFailure from "../domain/errors/loginFailure";
import DITypes from "../../../api/config/diTypes";

@injectable()
export default class AccountService {
    constructor(@inject(DITypes.UserRepository) private repository: UserRepository) { }

    async register(username: string, email: string, password: string) {
        const user = new User(username, email, password);
        user.hashPassword();
        await this.repository.create(user);
    }

    async login(email: string, password: string) {
        const hashedPassword = await this.repository.login(new Email(email));
        if (!hashedPassword.isEqualTo(password)){
            throw new LoginFailure();
        }
        // TODO: Implement JWT here
        return 'token';
    }
}