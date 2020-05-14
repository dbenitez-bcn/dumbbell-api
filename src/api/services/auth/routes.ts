import { Router } from "express";
import { Endpoints } from "../../config/constants";
import TypeormUsersRepository from "../../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../../src/accounts/application/accountService";
import AuthController from "./authController";

const repository = new TypeormUsersRepository();
const service = new AccountService(repository);
const controller = new AuthController(service);

const router = Router();

router.post(
    Endpoints.LOGIN,
    controller.login.bind(controller)
);

export default router;