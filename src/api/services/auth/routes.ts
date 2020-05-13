import { Endpoints } from "../../config/constants";
import TypeormUsersRepository from "../../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../../src/accounts/application/accountService";
import AuthController from "./authController";

const repository = new TypeormUsersRepository();
const service = new AccountService(repository);
const controller = new AuthController(service);

export default [
    {
        path: Endpoints.LOGIN,
        method: 'post',
        handler: controller.login.bind(controller)
    }
]