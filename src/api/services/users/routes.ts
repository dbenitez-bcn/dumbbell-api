import { Endpoints } from "../../config/constants";
import TypeormUsersRepository from "../../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../../src/accounts/application/accountService";
import UsersController from "./usersController";

const repository = new TypeormUsersRepository();
const service = new AccountService(repository);
const controller = new UsersController(service);

export default [
    {
        path: Endpoints.REGISTER,
        method: "post",
        handler: controller.registration.bind(controller)
    }
]