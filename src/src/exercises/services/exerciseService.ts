import ExerciseRepository from "../domain/repositories/exerciseRepository";
import Exercise from "../domain/aggregates/exercise";
import ExerciseId from "../domain/valueObject/exerciseId";
import ExerciseParams from "../domain/aggregates/exerciseParams";
import Name from "../domain/valueObject/name";
import Description from "../domain/valueObject/description";
import Difficulty from "../domain/valueObject/difficulty";

export default class ExerciseService {
    constructor(private readonly repository: ExerciseRepository) { }

    async create(name: string, description: string, difficulty: number) {
        const exercise = new Exercise(name, description, difficulty);
        return await this.repository.create(exercise);
    }

    async getAll() {
        return await this.repository.getAll();
    }

    async getById(id: number) {
        const exerciseId = new ExerciseId(id);
        return await this.repository.getById(exerciseId);
    }

    async update(id: number, name: string, description: string, difficulty: number) {
        const exerciseId = new ExerciseId(id);
        const params: ExerciseParams = {}
        if (typeof name === 'string') params.name = new Name(name);
        if (typeof description === 'string') params.description = new Description(description);
        if (typeof difficulty === 'number') params.difficutly = new Difficulty(difficulty);
        await this.repository.update(exerciseId, params);
    }

    async delete(id: number) {
        const exerciseId = new ExerciseId(id);
        await this.repository.delete(exerciseId);
    }
}