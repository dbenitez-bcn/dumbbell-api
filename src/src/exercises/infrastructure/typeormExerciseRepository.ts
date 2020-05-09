import { getRepository } from "typeorm";
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

export default class TypeormExerciseRepository implements ExerciseRepository {
    async create(excercise: ExerciseDomain): Promise<ExerciseDTO> {
        const newExercise = await getRepository(ExerciseDB).save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return ExerciseDTO.fromDB(newExercise);
    }

    async getAll(): Promise<ExerciseDTO[]> {
        const exercises = await getRepository(ExerciseDB).find()
            .catch((e) => {
                throw new DatabaseFailure();
            });
        if (exercises.length <= 0) {
            throw new ExercisesNotFound();
        }
        
        return exercises.map((exercise: ExerciseDB) => ExerciseDTO.fromDB(exercise));
    }

    async getById(id: ExerciseId): Promise<ExerciseDTO> {
        const exercise = await getRepository(ExerciseDB).findOne(id.value)
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
            await getRepository(ExerciseDB).update(id.value, foo)
        } catch (e) {
            throw new DatabaseFailure();
        }
    }

    async delete(id: ExerciseId): Promise<void> {
        try {
            await getRepository(ExerciseDB).delete(id.value);
        } catch (e) {
            throw new DatabaseFailure();
        }
    }
}