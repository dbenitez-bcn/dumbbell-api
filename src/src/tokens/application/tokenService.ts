import * as jwt from "jsonwebtoken";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

export default class TokenService {
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