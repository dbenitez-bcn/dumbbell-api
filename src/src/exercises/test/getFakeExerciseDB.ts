import ExerciseDB from "../domain/typeormEntities/exercise";
import { getFakeUserDB } from "../../accounts/test/getFakeUserDB";

export const getFakeExerciseDB = () => {
    const exercise = new ExerciseDB();
    exercise.id = 1;
    exercise.name = 'A name';
    exercise.description = 'A description';
    exercise.difficulty = 10;
    exercise.created_at = new Date().toISOString();
    exercise.updated_at = exercise.created_at;
    exercise.created_by = getFakeUserDB();
    
    return exercise;
}