import { inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import TokenService from "../../../src/tokens/application/tokenService";

export default class TokenMiddleware {
    constructor(@inject(TokenService) private tokenService: TokenService) { }

    validateToken(req: Request, res: Response, next: NextFunction) {
        let tokenData;
        const headerToken = <string>req.headers['Authorization'] || '';

        try {
            tokenData = this.tokenService.getTokenDataFromBaerer(headerToken);
        } catch(error) {
            res.status(401).send(error.message);
            return;
        }
        req.body.username = tokenData.username;
        next();
    }
}