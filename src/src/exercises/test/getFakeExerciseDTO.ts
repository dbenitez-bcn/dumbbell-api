import ExerciseDTO from "../domain/dtos/exerciseDTO"

export const getFakeExerciseDTO = () => {
    return new ExerciseDTO(1, 'A name', 'A description', 10, 'username');
}