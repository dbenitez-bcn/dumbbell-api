import { Request, Response } from "express";
import AccountService from "../../../src/accounts/application/accountService";
import ExistingEmail from "../../../src/accounts/domain/errors/existingEmail";
import ExistingUsername from "../../../src/accounts/domain/errors/existingUsername";
import InvalidEmail from "../../../src/accounts/domain/errors/invalidEmail";
import InvalidPasswordFormat from "../../../src/accounts/domain/errors/invalidPasswordFormat";
import InvalidUsernameLength from "../../../src/accounts/domain/errors/invalidUsername";
import InvalidPasswordLength from "../../../src/accounts/domain/errors/invalidPasswordLength";
import InvalidUsernameFormat from "../../../src/accounts/domain/errors/invalidUsernameFormat";
import { injectable, inject } from "inversify";

@injectable()
export default class UsersController {
    constructor(@inject(AccountService) private service: AccountService) { }

    async registration(req: Request, res: Response) {
        try {
            await this.service.register(req.body.username, req.body.email, req.body.password);
            res.status(201).send();        
        } catch (e) {
            if (e instanceof ExistingEmail || e instanceof ExistingUsername) {
                res.status(409).send(e.message);
            } else if (this.paramsError(e)) {
                res.status(422).send(e.message);
            }else {
                res.status(500).send(e.message)
            }
        }
    }

    private paramsError(e: Error): boolean {
        return e instanceof InvalidEmail ||
        e instanceof InvalidPasswordFormat ||
        e instanceof InvalidPasswordLength ||
        e instanceof InvalidUsernameLength ||
        e instanceof InvalidUsernameFormat;
    }
}