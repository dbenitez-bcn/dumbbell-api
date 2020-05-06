import Exercise from "../domain/aggregates/exercise";

export const getFakeExercise = () => {
    return new Exercise('A name', 'A description', 5);
}