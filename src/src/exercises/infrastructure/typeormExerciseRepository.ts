import ExerciseRepository from "../domain/repositories/exerciseRepository";
import ExerciseDomain from "../domain/aggregates/exercise";
import { getRepository } from "typeorm";
import { Exercise } from "../../../api/models/entities/exercise";
import DatabaseFailure from "../domain/errors/DatabaseFailure";

export default class TypeormExerciseRepository implements ExerciseRepository<Exercise> {
    async create(excercise: ExerciseDomain): Promise<Exercise> {
        const repo = getRepository(Exercise);
        const newExercise = await repo.save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value,
        }).catch(() => {
            throw new DatabaseFailure();
        });

        return newExercise;
    }

}