import { Request, Response } from "express";
import { getExercisesHandler, createExerciseHandler } from "./exercisesController";

export default [
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send(`<h2>Welcome to dumbbell API</h2>
      <b>Exercises</b>: ${process.env.DB_HOST}/exercises`);
    }
  },
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