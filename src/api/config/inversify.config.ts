import { Container } from "inversify";
import UserRepository from "../../src/accounts/domain/repositories/userRepository";
import DITypes from "./diTypes";
import TypeormUsersRepository from "../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../src/accounts/application/accountService";
import AuthController from "../services/auth/authController";
import UsersController from "../services/users/usersController";

const DIContainer = new Container();

DIContainer.bind<UserRepository>(DITypes.UserRepository).to(TypeormUsersRepository);
DIContainer.bind<AccountService>(AccountService).to(AccountService);
DIContainer.bind<AuthController>(AuthController).to(AuthController);
DIContainer.bind<UsersController>(UsersController).to(UsersController);

export default DIContainer;