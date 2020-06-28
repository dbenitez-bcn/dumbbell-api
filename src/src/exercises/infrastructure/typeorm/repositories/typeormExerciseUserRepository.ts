import { Repository, getRepository } from "typeorm";
import DatabaseFailure from "../../../domain/errors/DatabaseFailure";
import ExistingUsername from "../../../domain/errors/existingUsername";
import User from "../../../domain/aggregates/user";
import UserDB from "../entities/user";
import { injectable } from "inversify";

@injectable()
export default class TypeormExerciseUserRepository {
    private repository: Repository<UserDB>;

    constructor() {
        this.repository = getRepository(UserDB);
    }

    async create(user: User): Promise<User> {
        try {
            const createdUser = await this.repository.save({
                username: user.username.value,
                role: user.role
            });
            return new User(createdUser.username, createdUser.role);
        } catch (e) {
            if (e.detail) {
                throw new ExistingUsername();
            } else {
                throw new DatabaseFailure();
            }
        }
    }
}