import { getRepository } from "typeorm";
import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseDomain from "../domain/aggregates/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import ExerciseDB from "../../../api/models/entities/exercise";
import ExercisesNotFound from "../domain/errors/ExercisesNotFound";
import ExerciseNotFound from "../domain/errors/ExerciseNotFound";

export default class TypeormExerciseRepository implements ExerciseRepository<ExerciseDB> {
    private exerciseRepository = getRepository(ExerciseDB);

    async create(excercise: ExerciseDomain): Promise<ExerciseDB> {
        const newExercise = await this.exerciseRepository.save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return newExercise;
    }

    async getAll(): Promise<ExerciseDB[]> {
        const exercises = await this.exerciseRepository.find()
            .catch(() => {
                throw new DatabaseFailure();
            });
        if (exercises.length <= 0) {
            throw new ExercisesNotFound();
        }
        return exercises;
    }

    async getById(id: ExerciseId): Promise<ExerciseDB> {
        const exercise = await this.exerciseRepository.findOne(id.value)
            .catch(() => {
                throw new DatabaseFailure();
            })
        if (!exercise) {
            throw new ExerciseNotFound();
        } else {
            return exercise;
        }
    }

    async update(id: ExerciseId, params: ExerciseParams): Promise<void> {
        try {
            await this.exerciseRepository.update(id.value, {
                name: params.name?.value,
                description: params.description?.value,
                difficulty: params.difficutly?.value
            })
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