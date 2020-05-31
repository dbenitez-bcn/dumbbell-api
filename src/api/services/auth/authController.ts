import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import AccountService from "../../../src/accounts/application/accountService";
import LoginFailure from "../../../src/accounts/domain/errors/loginFailure";
import { Constants } from "../../config/constants";
import UserNotFound from "../../../src/accounts/domain/errors/userNotFound";
import InvalidEmail from "../../../src/accounts/domain/errors/invalidEmail";
import InvalidPasswordFormat from "../../../src/accounts/domain/errors/invalidPasswordFormat";
import InvalidPasswordLength from "../../../src/accounts/domain/errors/invalidPasswordLength";
import UnauthorizedAction from "../../../core/domain/errors/unauthorizedAction";

@injectable()
export default class AuthController {
    constructor(@inject(AccountService) private service: AccountService) { }

    async login(req: Request, res: Response) {
        try {
            const token = await this.service.login(req.body.email, req.body.password);
            res.status(200).send({token});
        } catch (e) {
            if (e instanceof LoginFailure) {
                res.status(401).send(Constants.LOGIN_FAILURE);
            } else if (e instanceof UserNotFound) {
                res.status(404).send(Constants.LOGIN_FAILURE);
            } else if (this.isParamError(e)) {
                res.status(422).send(Constants.LOGIN_FAILURE);
            } else {
                res.status(500).send(e.message);
            }
        }
    }

    async loginInAdmin(req: Request, res: Response) {
        try {
            const token = await this.service.operatorLogin(req.body.email, req.body.password);
            res.status(200).send({token});
        } catch (e) {
            if (e instanceof UnauthorizedAction) {
                res.status(401).send(e.message);
            } else if (e instanceof LoginFailure) {
                res.status(401).send(Constants.LOGIN_FAILURE);
            } else if (e instanceof UserNotFound) {
                res.status(404).send(Constants.LOGIN_FAILURE);
            } else if (this.isParamError(e)) {
                res.status(422).send(Constants.LOGIN_FAILURE);
            } else {
                res.status(500).send(e.message);
            }
        }
    }

    private isParamError(e: Error): boolean {
        return e instanceof InvalidEmail || e instanceof InvalidPasswordFormat || e instanceof InvalidPasswordLength;
    }
}