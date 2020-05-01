import ExerciseRepository from "../../src/exercises/domain/repositories/exerciseRepository";
import ExerciseDomain from "../../src/exercises/domain/aggregates/exercise";
import { getRepository } from "typeorm";
import { Exercise } from "../models/entities/exercise";

export default class TypeormExerciseRepository implements ExerciseRepository{
    async create(excercise: ExerciseDomain): Promise<number> {
        const repo = getRepository(Exercise);
        const newExercise = await repo.save({
            name: excercise.name.value,
            description: excercise.description.value,
            difficulty: excercise.difficulty.value,
        });

        return newExercise.id;
    }

}