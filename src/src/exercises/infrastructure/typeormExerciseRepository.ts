import { getRepository } from "typeorm";
import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseDomain from "../domain/aggregates/exercise";
import { Exercise } from "../../../api/models/entities/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";

export default class TypeormExerciseRepository implements ExerciseRepository<Exercise> {
    private exerciseRepository = getRepository(Exercise);

    async create(excercise: ExerciseDomain): Promise<Exercise> {
        const newExercise = await this.exerciseRepository.save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return newExercise;
    }

    async getAll(): Promise<Exercise[]> {
        const exercises = await this.exerciseRepository.find()
            .catch(() => {
                throw new DatabaseFailure();
            });

        return exercises
    }

    async getById(id: ExerciseId): Promise<Exercise> {
        const res = await this.exerciseRepository.findOneOrFail(id.value)
            .catch(() => {
                throw new DatabaseFailure();
            })
        return res;
    }

    async update(id: ExerciseId, params: ExerciseParams): Promise<void> {
        await this.exerciseRepository.update(id.value, {
            name: params.name?.value,
            description: params.description?.value,
            difficulty: params.difficutly?.value
        })
    }
}