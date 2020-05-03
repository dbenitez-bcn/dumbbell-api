import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseDomain from "../domain/aggregates/exercise";
import { getRepository } from "typeorm";
import { Exercise } from "../../../api/models/entities/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";

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
}