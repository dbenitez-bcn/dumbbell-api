import ExerciseCreationRequest from "../../models/requests/exerciseCreationRequest";
import ExerciseCreationBody from "../../models/bodies/exerciseCreationBody";

export class ExerciseBodyValidator {
    creationBody(body: ExerciseCreationBody): ExerciseCreationRequest {
        return new ExerciseCreationRequest(body.name, body.description, body.difficulty);
    }
}