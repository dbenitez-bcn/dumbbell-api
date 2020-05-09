import { Endpoints } from "../../config/constants";
import ExerciceController from "./exerciseController";
import ExerciseService from "../../../src/exercises/services/exerciseService";
import TypeormExerciseRepository from "../../../src/exercises/infrastructure/typeormExerciseRepository";

const repository = new TypeormExerciseRepository()
const serivce = new ExerciseService(repository);
const controller = new ExerciceController(serivce);

export default [
  {
    path: Endpoints.EXERCISES,
    method: "get",
    handler: controller.getAll.bind(controller)
  },
  {
    path: Endpoints.EXERCISE,
    method: "post",
    handler: controller.create.bind(controller)
  },
  {
    path: Endpoints.EXERCISE + "/:id",
    method: "get",
    handler: controller.getById.bind(controller)
  },
  {
    path: Endpoints.EXERCISE + "/:id",
    method: "delete",
    handler: controller.delete.bind(controller)
  },
  {
    path: Endpoints.EXERCISE + "/:id",
    method: "put",
    handler: controller.update.bind(controller)
  }
];