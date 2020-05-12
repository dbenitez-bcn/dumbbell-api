import UserRepository from "../domain/repositories/userRepository";
import HashedPassword from "../domain/valueObjects/hashedPassword";
import User from "../domain/aggregates/user";
import Email from "../domain/valueObjects/email";
import { getRepository } from "typeorm";
import UserDB from "../../../api/models/entities/user";
import DatabaseFailure from "../../exercises/domain/errors/DatabaseFailure";
import ExistingUsername from "../domain/errors/existingUsername";
import ExistingEmail from "../domain/errors/existingEmail";

export default class TypeormUsersRepository implements UserRepository {

    async register(user: User): Promise<void> {
        try {
            await getRepository(UserDB).insert({
                username: user.username.value,
                email: user.email.value,
                password: user.password.value
            })
        } catch (e) {
            if (e.detail) {
                if (e.detail.includes('username')) {
                    throw new ExistingUsername();
                } else if (e.detail.includes('email')) {
                    throw new ExistingEmail();
                }
            } else {
                throw new DatabaseFailure();
            }
        }
    }

    login(email: Email): Promise<HashedPassword> {
        throw new Error("Method not implemented.");
    }

}