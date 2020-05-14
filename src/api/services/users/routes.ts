import { Router } from "express";
import { Endpoints } from "../../config/constants";
import TypeormUsersRepository from "../../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../../src/accounts/application/accountService";
import UsersController from "./usersController";

const repository = new TypeormUsersRepository();
const service = new AccountService(repository);
const controller = new UsersController(service);

const router = Router();

router.post(
    Endpoints.REGISTER,
    controller.registration.bind(controller)
)

export default router;