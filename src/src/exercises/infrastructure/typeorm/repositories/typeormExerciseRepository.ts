import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import ExerciseRepository from "../../../domain/repositories/exerciseRepository";
import Exercise from "../../../domain/aggregates/exercise";
import DatabaseFailure from "../../../domain/errors/DatabaseFailure";
import ExerciseId from "../../../domain/valueObject/exerciseId";
import ExerciseParams from "../../../domain/aggregates/exerciseParams";
import ExerciseDB from "../entities/exercise";
import ExercisesNotFound from "../../../domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../../../domain/errors/ExerciseNotFound";
import UserAccountDB from "../../../../accounts/infrastructure/typeorm/entities/user";

@injectable()
export default class TypeormExerciseRepository implements ExerciseRepository {
    private exerciseRepository: Repository<ExerciseDB>
    private userRepository: Repository<UserAccountDB>

    constructor() {
        this.exerciseRepository = getRepository(ExerciseDB);
        this.userRepository = getRepository(UserAccountDB);
    }

    async create(exercise: Exercise): Promise<Exercise> {
        const user = await this.userRepository.findOne({where: {username: exercise.createdBy.value}});
        const newExercise = await this.exerciseRepository.save({
            name: exercise.name.value,
            description: exercise.description.value,
            difficulty: exercise.difficulty.value,
            created_by: user
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return new Exercise(newExercise.id, newExercise.name, newExercise.description, newExercise.difficulty, newExercise.created_by.username);
    }

    async getAll(): Promise<Exercise[]> {
        const exercises = await this.exerciseRepository.find({
            relations: ['created_by']
        })
            .catch((e) => {
                throw new DatabaseFailure();
            });
        if (exercises.length <= 0) {
            throw new ExercisesNotFound();
        }

        return exercises.map((exercise: ExerciseDB) =>  new Exercise(exercise.id, exercise.name, exercise.description, exercise.difficulty, exercise.created_by.username));
    }

    async getById(id: ExerciseId): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOne(id.value, {
            relations: ['created_by']
        })
            .catch(() => {
                throw new DatabaseFailure();
            })
        if (!exercise) {
            throw new ExerciseNotFound();
        }

        return new Exercise(exercise.id, exercise.name, exercise.description, exercise.difficulty, exercise.created_by.username);
    }

    async update(id: ExerciseId, params: ExerciseParams): Promise<void> {
        try {
            const updatedParams: QueryDeepPartialEntity<ExerciseDB> = {}
            if (params.name) updatedParams.name = params.name.value;
            if (params.description) updatedParams.description = params.description.value;
            if (params.difficutly) updatedParams.difficulty = params.difficutly.value;
            await this.exerciseRepository.update(id.value, updatedParams)
        } catch (e) {
            throw new DatabaseFailure();
        }
    }

    async delete(id: ExerciseId): Promise<void> {
        try {
            await this.exerciseRepository.delete(id.value);
        } catch (e) {
            throw new DatabaseFailure();
        }
    }
}