import Exercise from "../domain/aggregates/exercise";

export const getFakeExercise = () => {
    return new Exercise(0, 'A name', 'A description', 5, 'username');
}