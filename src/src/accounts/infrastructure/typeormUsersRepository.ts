import { getRepository, Repository } from "typeorm";
import { injectable } from "inversify";
import UserRepository from "../domain/repositories/userRepository";
import HashedPassword from "../domain/valueObjects/hashedPassword";
import User from "../domain/aggregates/user";
import Email from "../domain/valueObjects/email";
import UserDB from "../domain/typeormEntities/user";
import DatabaseFailure from "../../exercises/domain/errors/DatabaseFailure";
import ExistingUsername from "../domain/errors/existingUsername";
import ExistingEmail from "../domain/errors/existingEmail";
import UserNotFound from "../domain/errors/userNotFound";

@injectable()
export default class TypeormUsersRepository implements UserRepository {
    private repository: Repository<UserDB>;

    constructor() {
        this.repository = getRepository(UserDB);
    }

    async create(user: User): Promise<void> {
        try {
            await this.repository.insert({
                username: user.username.value,
                email: user.email.value,
                password: user.password.value
            })
        } catch (e) {
            if (e.detail) {
                if (e.detail.includes('username')) {
                    throw new ExistingUsername();
                } else {
                    throw new ExistingEmail();
                }
            } else {
                throw new DatabaseFailure();
            }
        }
    }

    async login(email: Email): Promise<HashedPassword> {
        const user = await this.repository.findOne({ email: email.value })
            .catch(() => {
                throw new DatabaseFailure();
            });
        if (user === undefined) {
            throw new UserNotFound();
        }
        return new HashedPassword(user.password);
    }

}