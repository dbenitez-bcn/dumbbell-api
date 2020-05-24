import { injectable, inject } from "inversify";
import UserRepository from "../domain/repositories/userRepository";
import User from "../domain/aggregates/user";
import Email from "../domain/valueObjects/email";
import LoginFailure from "../domain/errors/loginFailure";
import DITypes from "../../../api/config/diTypes";
import HashedPassword from "../domain/valueObjects/hashedPassword";
import UserRole from "../domain/valueObjects/userRole";
import UnauthorizedAction from "../domain/errors/unauthorizedAction";

@injectable()
export default class AccountService {
    constructor(@inject(DITypes.UserRepository) private repository: UserRepository) { }

    async register(username: string, email: string, password: string) {
        const user = User.newUser(username, email, password);
        user.hashPassword();
        await this.repository.create(user);
    }

    async login(email: string, password: string) {
        const user = await this.repository.findByEmail(new Email(email));
        const hashedPassword = user.password as HashedPassword;
        if (!hashedPassword.isEqualTo(password)){
            throw new LoginFailure();
        }
        // TODO: Implement JWT here
        return 'token';
    }

    async operatorLogin(email: string, password: string) {
        const user = await this.repository.findByEmail(new Email(email));
        if (user.role !== UserRole.OPERATOR) {
            throw new UnauthorizedAction();
        }

        const hashedPassword = user.password as HashedPassword;
        if (!hashedPassword.isEqualTo(password)){
            throw new LoginFailure();
        }
        
        // TODO: Implement JWT here
        return 'token';
    }
}