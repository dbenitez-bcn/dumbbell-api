import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

@injectable()
export default class TokenService {
    generateToken(username: string) {
        const payload = {
            username: username
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