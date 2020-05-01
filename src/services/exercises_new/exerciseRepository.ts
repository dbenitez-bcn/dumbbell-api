import Exercise from "../../domain/aggregates/exercise";

export default interface ExerciseRepository {
    create(excercise: Exercise): Promise<void>
}