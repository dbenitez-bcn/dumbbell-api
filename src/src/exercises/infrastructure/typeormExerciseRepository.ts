import { getRepository, Repository } from "typeorm";
import ExerciseRepository from "../domain/repositories/exerciseRepository";
import Exercise from "../domain/aggregates/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import ExerciseDB from "../domain/typeormEntities/exercise";
import ExercisesNotFound from "../domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../domain/errors/ExerciseNotFound";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { injectable } from "inversify";

@injectable()
export default class TypeormExerciseRepository implements ExerciseRepository {
    private repository: Repository<ExerciseDB>

    constructor() {
        this.repository = getRepository(ExerciseDB);
    }

    async create(exercise: Exercise): Promise<Exercise> {
        const newExercise = await this.repository.save({
            name: exercise.name.value,
            description: exercise.description.value,
            difficulty: exercise.difficulty.value
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return new Exercise(newExercise.id, newExercise.name, newExercise.description, newExercise.difficulty);
    }

    async getAll(): Promise<Exercise[]> {
        const exercises = await this.repository.find()
            .catch((e) => {
                throw new DatabaseFailure();
            });
        if (exercises.length <= 0) {
            throw new ExercisesNotFound();
        }

        return exercises.map((exercise: ExerciseDB) =>  new Exercise(exercise.id, exercise.name, exercise.description, exercise.difficulty));
    }

    async getById(id: ExerciseId): Promise<Exercise> {
        const exercise = await this.repository.findOne(id.value)
            .catch(() => {
                throw new DatabaseFailure();
            })
        if (!exercise) {
            throw new ExerciseNotFound();
        }

        return new Exercise(exercise.id, exercise.name, exercise.description, exercise.difficulty);
    }

    async update(id: ExerciseId, params: ExerciseParams): Promise<void> {
        try {
            const updatedParams: QueryDeepPartialEntity<ExerciseDB> = {}
            if (params.name) updatedParams.name = params.name.value;
            if (params.description) updatedParams.description = params.description.value;
            if (params.difficutly) updatedParams.difficulty = params.difficutly.value;
            await this.repository.update(id.value, updatedParams)
        } catch (e) {
            throw new DatabaseFailure();
        }
    }

    async delete(id: ExerciseId): Promise<void> {
        try {
            await this.repository.delete(id.value);
        } catch (e) {
            throw new DatabaseFailure();
        }
    }
}