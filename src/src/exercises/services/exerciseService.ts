import ExerciseRepository from "../domain/repositories/exerciseRepository";
import Exercise from "../domain/aggregates/exercise";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import Name from "../domain/valueObject/name";
import Description from "../domain/valueObject/description";
import Difficulty from "../domain/valueObject/difficulty";
import { injectable, inject } from "inversify";
import DITypes from "../../../core/iot/diTypes";
import ExerciseDTO from "../domain/dtos/exerciseDTO";
import UnauthorizedAction from "../../../core/domain/errors/unauthorizedAction";
import UserRepository from "../../accounts/domain/repositories/userRepository";
import Username from "../../accounts/domain/valueObjects/username";
import UserRole from "../../accounts/domain/valueObjects/userRole";
import User from "../../accounts/domain/aggregates/user";

@injectable()
export default class ExerciseService {
    constructor(
        @inject(DITypes.ExerciseRepository) private readonly repository: ExerciseRepository,
        @inject(DITypes.UserRepository) private readonly userRepository: UserRepository
    ) { }

    async create(name: string, description: string, difficulty: number, createdBy: string): Promise<ExerciseDTO> {
        const exercise = new Exercise(0, name, description, difficulty, createdBy);
        const newExercise = await this.repository.create(exercise);
        return new ExerciseDTO(newExercise.id, newExercise.name.value, newExercise.description.value, newExercise.difficulty.value, newExercise.createdBy.value);
    }

    async getAll(): Promise<ExerciseDTO[]> {
        const exercises = await this.repository.getAll();
        return exercises.map((exercise: Exercise) => new ExerciseDTO(exercise.id, exercise.name.value, exercise.description.value, exercise.difficulty.value, exercise.createdBy.value));
    }

    async getById(id: number): Promise<ExerciseDTO> {
        const exerciseId = new ExerciseId(id);
        const exercise = await this.repository.getById(exerciseId);
        return new ExerciseDTO(exercise.id, exercise.name.value, exercise.description.value, exercise.difficulty.value, exercise.createdBy.value);
    }

    async update(id: number, name: string, description: string, difficulty: number, username: string) {
        const exerciseId = new ExerciseId(id);
        const exercise = await this.repository.getById(exerciseId);
        const user = await this.userRepository.findByUsername(new Username(username));
        if (!this.isOwner(user, exercise) && !this.isOperator(user)) {
            throw new UnauthorizedAction();
        }
        const params: ExerciseParams = {}
        if (typeof name === 'string') params.name = new Name(name);
        if (typeof description === 'string') params.description = new Description(description);
        if (typeof difficulty === 'number') params.difficutly = new Difficulty(difficulty);
        await this.repository.update(exerciseId, params);
    }

    async delete(id: number, username: string) {
        const exerciseId = new ExerciseId(id);
        const exercise = await this.repository.getById(exerciseId);
        const user = await this.userRepository.findByUsername(new Username(username));
        if (!this.isOwner(user, exercise) && !this.isOperator(user)) {
            throw new UnauthorizedAction();
        }
        await this.repository.delete(exerciseId);
    }

    private isOperator(user: User) {
        return user.role == UserRole.OPERATOR;
    }

    private isOwner(user: User, exercise: Exercise) {
        return user.username.value == exercise.createdBy.value;
    }
}