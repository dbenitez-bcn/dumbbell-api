import Exercise from "../aggregates/exercise";
import ExerciseId from "../valueObject/exerciseId";

export default interface ExerciseRepository<T> {
    create(excercise: Exercise): Promise<T>
    getAll(): Promise<T[]>
    getById(id: ExerciseId): Promise<T>
}