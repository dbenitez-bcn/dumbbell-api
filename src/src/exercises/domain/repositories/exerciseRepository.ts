import Exercise from "../aggregates/exercise";
import ExerciseId from "../valueObject/exerciseId";
import ExerciseParams from "../aggregates/exerciseParams";

export default interface ExerciseRepository<T> {
    create(excercise: Exercise): Promise<T>
    getAll(): Promise<T[]>
    getById(id: ExerciseId): Promise<T>
    update(id: ExerciseId, params: ExerciseParams): Promise<void>
    delete(id: ExerciseId): Promise<void>
}