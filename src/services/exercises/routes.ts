import { getExercisesHandler, createExerciseHandler } from "./exercisesController";

export default [
  {
    path: "/exercises",
    method: "get",
    handler: getExercisesHandler
  },
  {
    path: "/exercise",
    method: "post",
    handler: createExerciseHandler
  }
];