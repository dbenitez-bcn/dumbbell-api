import { Container } from "inversify";
import UserRepository from "../../src/accounts/domain/repositories/userRepository";
import DITypes from "./diTypes";
import TypeormUsersRepository from "../../src/accounts/infrastructure/typeorm/repositories/typeormUsersRepository";
import AccountService from "../../src/accounts/application/accountService";
import AuthController from "../../api/services/auth/authController";
import UsersController from "../../api/services/users/usersController";
import ExerciseController from "../../api/services/exercises/exerciseController";
import ExerciseRepository from "../../src/exercises/domain/repositories/exerciseRepository";
import TypeormExerciseRepository from "../../src/exercises/infrastructure/typeorm/repositories/typeormExerciseRepository";
import ExerciseService from "../../src/exercises/services/exerciseService";
import TokenService from "../../src/tokens/application/tokenService";
import TokenMiddleware from "../../api/middlewares/tokens/tokenMiddleware";
import EventBus from "../domain/events/eventBus";
import LocalEventBus from "../infrastructure/events/localEventBus";

const DIContainer = new Container();

// Event bus
DIContainer.bind<EventBus>(DITypes.EventBus).to(LocalEventBus);

// Repositories
DIContainer.bind<UserRepository>(DITypes.UserAccountRepository).to(TypeormUsersRepository);
DIContainer.bind<ExerciseRepository>(DITypes.ExerciseRepository).to(TypeormExerciseRepository);

// Services
DIContainer.bind<TokenService>(TokenService).to(TokenService);
DIContainer.bind<AccountService>(AccountService).to(AccountService);
DIContainer.bind<ExerciseService>(ExerciseService).to(ExerciseService);

// Controllers
DIContainer.bind<AuthController>(AuthController).to(AuthController);
DIContainer.bind<UsersController>(UsersController).to(UsersController);
DIContainer.bind<ExerciseController>(ExerciseController).to(ExerciseController);
DIContainer.bind<TokenMiddleware>(TokenMiddleware).to(TokenMiddleware);

export default DIContainer;