import ExerciseRepository from "../domain/repositories/exerciseRepository";
import Exercise from "../domain/aggregates/exercise";

export default class ExerciseService {
    constructor(private readonly repository: ExerciseRepository) { }

    async create(name: string, description: string, difficulty: number): Promise<number> {
        const exercise = new Exercise(name, description, difficulty);
        return await this.repository.create(exercise);
    }
}