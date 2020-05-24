import User from "../domain/aggregates/user";
import Secrets from "../../../api/config/secrets";
import * as jwt from "jsonwebtoken";

export default class TokenGeneratorService {
    generateTokenFor(user: User) {
        const payload = {
            username: user.username.value,
            role: user.role
        }
        return jwt.sign(payload, Secrets.JWT_SCRET);
    }
}