import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import TokenService from "../../../src/tokens/application/tokenService";

@injectable()
export default class TokenMiddleware {
    constructor(@inject(TokenService) private tokenService: TokenService) { }

    validateToken(req: Request, res: Response, next: NextFunction) {
        let tokenData;
        const headerToken = <string>req.headers.authorization || '';

        try {
            tokenData = this.tokenService.getTokenDataFromBearer(headerToken);
        } catch(error) {
            res.status(401).send(error.message);
            return;
        }
        req.body.username = tokenData.username;
        next();
    }
}