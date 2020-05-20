import ExerciseDB from "../typeormEntities/exercise";

export default class ExerciseDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly difficulty: number
    ){}

    static fromDB(exercise: ExerciseDB) {
        return new ExerciseDTO(exercise.id, exercise.name, exercise.description, exercise.difficulty);
    }
}