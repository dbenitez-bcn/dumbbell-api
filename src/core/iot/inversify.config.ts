import { Container } from "inversify";
import UserRepository from "../../src/accounts/domain/repositories/userRepository";
import DITypes from "./diTypes";
import TypeormUsersRepository from "../../src/accounts/infrastructure/typeormUsersRepository";
import AccountService from "../../src/accounts/application/accountService";
import AuthController from "../../api/services/auth/authController";
import UsersController from "../../api/services/users/usersController";
import ExerciseController from "../../api/services/exercises/exerciseController";
import ExerciseRepository from "../../src/exercises/domain/repositories/exerciseRepository";
import TypeormExerciseRepository from "../../src/exercises/infrastructure/typeormExerciseRepository";
import ExerciseService from "../../src/exercises/services/exerciseService";
import TokenGeneratorService from "../../src/accounts/application/tokenGeneratorService";

const DIContainer = new Container();

// Repositories
DIContainer.bind<UserRepository>(DITypes.UserRepository).to(TypeormUsersRepository);
DIContainer.bind<ExerciseRepository>(DITypes.ExerciseRepository).to(TypeormExerciseRepository);

// Services
DIContainer.bind<TokenGeneratorService>(TokenGeneratorService).to(TokenGeneratorService);
DIContainer.bind<AccountService>(AccountService).to(AccountService);
DIContainer.bind<ExerciseService>(ExerciseService).to(ExerciseService);

// Controllers
DIContainer.bind<AuthController>(AuthController).to(AuthController);
DIContainer.bind<UsersController>(UsersController).to(UsersController);
DIContainer.bind<ExerciseController>(ExerciseController).to(ExerciseController);

export default DIContainer;