import { getRepository, Repository } from "typeorm";
import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseDomain from "../domain/aggregates/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import ExerciseDB from "../../../api/models/entities/exercise";
import ExercisesNotFound from "../domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../domain/errors/ExerciseNotFound";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import ExerciseDTO from "../domain/dtos/exerciseDTO";
import { injectable } from "inversify";

@injectable()
export default class TypeormExerciseRepository implements ExerciseRepository {
    private repository: Repository<ExerciseDB>

    constructor() {
        this.repository = getRepository(ExerciseDB);
    }

    async create(excercise: ExerciseDomain): Promise<ExerciseDTO> {
        const newExercise = await this.repository.save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return ExerciseDTO.fromDB(newExercise);
    }

    async getAll(): Promise<ExerciseDTO[]> {
        const exercises = await this.repository.find()
            .catch((e) => {
                throw new DatabaseFailure();
            });
        if (exercises.length <= 0) {
            throw new ExercisesNotFound();
        }

        return exercises.map((exercise: ExerciseDB) => ExerciseDTO.fromDB(exercise));
    }

    async getById(id: ExerciseId): Promise<ExerciseDTO> {
        const exercise = await this.repository.findOne(id.value)
            .catch(() => {
                throw new DatabaseFailure();
            })
        if (!exercise) {
            throw new ExerciseNotFound();
        }

        return ExerciseDTO.fromDB(exercise);
    }

    async update(id: ExerciseId, params: ExerciseParams): Promise<void> {
        try {
            const foo: QueryDeepPartialEntity<ExerciseDB> = {}
            if (params.name) foo.name = params.name.value;
            if (params.description) foo.description = params.description.value;
            if (params.difficutly) foo.difficulty = params.difficutly.value;
            await this.repository.update(id.value, foo)
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