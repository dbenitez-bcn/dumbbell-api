import ExerciseRepository from "../domain/repositories/exerciseRepository";
import Exercise from "../domain/aggregates/exercise";

export default class ExerciseService<T> {
    constructor(private readonly repository: ExerciseRepository<T>) { }

    async create(name: string, description: string, difficulty: number): Promise<T> {
        const exercise = new Exercise(name, description, difficulty);
        return await this.repository.create(exercise);
    }

    async getAll() {
        return await this.repository.getAll();
    }
}