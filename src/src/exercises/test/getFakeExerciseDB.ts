import ExerciseDB from "../../../api/models/entities/exercise"

export const getFakeExerciseDB = () => {
    const exercise = new ExerciseDB();
    exercise.id = 1;
    exercise.name = 'A name';
    exercise.description = 'A description';
    exercise.difficulty = 10;
    exercise.created_at = new Date().toISOString();
    exercise.updated_at = exercise.created_at;
    
    return exercise;
}