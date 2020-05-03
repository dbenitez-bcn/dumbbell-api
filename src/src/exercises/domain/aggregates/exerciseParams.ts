import Name from "../valueObject/name";
import Description from "../valueObject/description";
import Difficulty from "../valueObject/difficulty";

export default interface ExerciseParams {
    name?: Name,
    description?: Description,
    difficutly?: Difficulty
}