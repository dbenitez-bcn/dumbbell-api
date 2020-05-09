import Exercise from "../aggregates/exercise";
import ExerciseId from "../valueObject/exerciseId";
import ExerciseParams from "../aggregates/exerciseParams";
import ExerciseDTO from "../dtos/exerciseDTO";

export default interface ExerciseRepository {
    create(excercise: Exercise): Promise<ExerciseDTO>
    getAll(): Promise<ExerciseDTO[]>
    getById(id: ExerciseId): Promise<ExerciseDTO>
    update(id: ExerciseId, params: ExerciseParams): Promise<void>
    delete(id: ExerciseId): Promise<void>
}