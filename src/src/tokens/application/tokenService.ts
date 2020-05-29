import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";
import BaererToken from "../domain/valueObjects/BaererToken";

@injectable()
export default class TokenService {
    generateToken(username: string) {
        const payload = {
            username: username
        }
        return jwt.sign(payload, Secrets.JWT_SCRET);
    }
    
    getTokenDataFromBaerer(token: string) {
        const baererToken = new BaererToken(token);
        try {
            return <any>jwt.verify(baererToken.value, Secrets.JWT_SCRET);
        } catch (e) {
            throw new InvalidToken();
        }
    }
}