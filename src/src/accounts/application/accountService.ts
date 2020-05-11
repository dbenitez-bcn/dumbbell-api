import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";
import Email from "../domain/valueObjects/email";
import LoginFailure from "../domain/errors/loginFailure";

export default class AccountService {
    constructor(private repository: UserRepository) { }

    async register(username: string, email: string, password: string) {
        const user = new User(username, email, password);
        user.hashPassword();
        await this.repository.register(user);
    }

    async login(email: string, password: string) {
        const hashedPassword = await this.repository.login(new Email(email));
        const isRightPassword = hashedPassword.compare(password);
        if (!isRightPassword){
            throw new LoginFailure();
        }
        // TODO: Implement JWT here
        return 'token';
    }
}