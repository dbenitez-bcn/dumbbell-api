import { getRepository, Repository } from "typeorm";
import { injectable } from "inversify";
import UserRepository from "../../../domain/repositories/userRepository";
import User from "../../../domain/aggregates/user";
import Email from "../../../domain/valueObjects/email";
import UserDB from "../entities/user";
import DatabaseFailure from "../../../../exercises/domain/errors/DatabaseFailure";
import ExistingUsername from "../../../domain/errors/existingUsername";
import ExistingEmail from "../../../domain/errors/existingEmail";
import UserNotFound from "../../../domain/errors/userNotFound";
import HashedPassword from "../../../domain/valueObjects/hashedPassword";
import Username from "../../../domain/valueObjects/username";

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

    async findByEmail(email: Email): Promise<User> {
        const user = await this.repository.findOne({ email: email.value })
            .catch(() => {
                throw new DatabaseFailure();
            });
        if (user === undefined) {
            throw new UserNotFound();
        }
        return new User(user.username, user.email, new HashedPassword(user.password), user.role);
    }

    async findByUsername(username: Username): Promise<User> {
        const user = await this.repository.findOne({ username: username.value })
            .catch(() => {
                throw new DatabaseFailure();
            });
        if (user === undefined) {
            throw new UserNotFound();
        }
        return new User(user.username, user.email, new HashedPassword(user.password), user.role);
    }

}