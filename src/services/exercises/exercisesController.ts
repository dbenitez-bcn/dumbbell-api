import { Request, Response } from "express";
import { getExercises, createExercise } from './providers/exercisesProvider'

export const getExercisesHandler = async (req: Request, res: Response) => {
  const result = await getExercises();
  res.status(200).send(result);
  // TODO: Add 404
}

export const createExerciseHandler = async (req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const result = await createExercise(name, description);
  res.status(201).send(result);
  // TODO: Add 500, failure exeptions handler
}