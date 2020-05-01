import Exercise from "../aggregates/exercise";

export default interface ExerciseRepository {
    create(excercise: Exercise): Promise<number>
}