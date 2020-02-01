import { getExercisesHandler, createExerciseHandler, getExerciseByIdHandler } from "./exercisesController";
import { Endpoints } from "../../config/constants";

export default [
  {
    path: Endpoints.EXERCISES,
    method: "get",
    handler: getExercisesHandler
  },
  {
    path: Endpoints.EXERCISE,
    method: "post",
    handler: createExerciseHandler
  },
  {
    path: Endpoints.EXERCISE + "/:id",
    method: "get",
    handler: getExerciseByIdHandler
  }
];