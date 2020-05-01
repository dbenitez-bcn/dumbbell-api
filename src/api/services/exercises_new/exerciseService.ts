import ExerciseRepository from "./exerciseRepository";
import Exercise from "../../domain/aggregates/exercise";

export default class ExerciseService {
    constructor(private readonly repository: ExerciseRepository) { }

    async create(name: string, description: string, difficulty: number) {
        const exercise = new Exercise(name, description, difficulty);
        await this.repository.create(exercise);
    }
}