import User from "../domain/aggregates/user";
import Secrets from "../../../core/secrets";
import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";

@injectable()
export default class TokenGeneratorService {
    generateTokenFor(user: User) {
        const payload = {
            username: user.username.value,
            role: user.role
        }
        return jwt.sign(payload, Secrets.JWT_SCRET);
    }
}