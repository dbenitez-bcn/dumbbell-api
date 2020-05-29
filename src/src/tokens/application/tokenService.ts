import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";
import User from "../../accounts/domain/aggregates/user";

@injectable()
export default class TokenService {
    generateTokenFor(user: User) {
        const payload = {
            username: user.username.value
        }
        return jwt.sign(payload, Secrets.JWT_SCRET);
    }
    
    getTokenDataFromBaerer(tokenHeader: string) {
        const token = this.extractTokenFromBaerer(tokenHeader);
        try {
            return jwt.verify(token, Secrets.JWT_SCRET);
        } catch (e) {
            throw new InvalidToken();
        }
    }

    private extractTokenFromBaerer(tokenHeader: string) {
        const token = tokenHeader.split(" ")[1];
        if (!token) {
            throw new InvalidToken();
        }

        return token;
    }
}