import Exercise from "../aggregates/exercise";
import ExerciseId from "../valueObject/exerciseId";
import ExerciseParams from "../aggregates/exerciseParams";

export default interface ExerciseRepository {
    create(exercise: Exercise): Promise<Exercise>
    getAll(): Promise<Exercise[]>
    getById(id: ExerciseId): Promise<Exercise>
    update(id: ExerciseId, params: ExerciseParams): Promise<void>
    delete(id: ExerciseId): Promise<void>
}