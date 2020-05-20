import { Container } from "inversify";
import UserRepository from "../../src/accounts/domain/repositories/userRepository";
import DITypes from "./diTypes";
import TypeormUsersRepository from "../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../src/accounts/application/accountService";
import AuthController from "../services/auth/authController";
import UsersController from "../services/users/usersController";
import ExerciseController from "../services/exercises/exerciseController";
import ExerciseRepository from "../../src/exercises/domain/repositories/exerciseRepository";
import TypeormExerciseRepository from "../../src/exercises/infrastructure/typeormExerciseRepository";
import ExerciseService from "../../src/exercises/services/exerciseService";

const DIContainer = new Container();

// Repositories
DIContainer.bind<UserRepository>(DITypes.UserRepository).to(TypeormUsersRepository);
DIContainer.bind<ExerciseRepository>(DITypes.ExerciseRepository).to(TypeormExerciseRepository);

// Services
DIContainer.bind<AccountService>(AccountService).to(AccountService);
DIContainer.bind<ExerciseService>(ExerciseService).to(ExerciseService);

// Controllers
DIContainer.bind<AuthController>(AuthController).to(AuthController);
DIContainer.bind<UsersController>(UsersController).to(UsersController);
DIContainer.bind<ExerciseController>(ExerciseController).to(ExerciseController);

export default DIContainer;