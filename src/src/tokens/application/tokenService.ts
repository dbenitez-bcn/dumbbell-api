import * as jwt from "jsonwebtoken";
import Secrets from "../../../core/secrets";
import InvalidToken from "../domain/errors/invalidToken";

export default class TokenService {
    getData(token: string) {
        try {
            const data = jwt.verify(token, Secrets.JWT_SCRET);
            return data;
        } catch (e) {
            throw new InvalidToken();
        }
    }
}