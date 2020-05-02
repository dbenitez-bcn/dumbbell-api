import Exercise from "../aggregates/exercise";

export default interface ExerciseRepository<T> {
    create(excercise: Exercise): Promise<T>
}