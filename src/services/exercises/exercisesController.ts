import { Request, Response } from "express";
import { getExercises, createExercise, getExerciseById, deleteExerciseById } from './providers/exercisesProvider'
import { Constants } from "../../config/constants";

export const getExercisesHandler = async (req: Request, res: Response) => {
  try {
    const result = await getExercises();
    if (result.length > 0) res.status(200).send(result);
    else res.status(404).send(Constants.NO_EXERCISES_FOUND);

  } catch (e) {
    databaseErrorHandler(res);
  }
}

export const createExerciseHandler = async (req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const difficulty = req.body.difficulty
    try {
      const result = await createExercise(name, description, difficulty);
      res.status(201).send(result[0]);
    } catch (e) {
      databaseErrorHandler(res);
    }
}

export const getExerciseByIdHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const result = await getExerciseById(id);
    if (result.length > 0) res.status(200).send(result[0]);
    else res.status(404).send(Constants.NO_EXERCISE_FOUND);
  } catch (e) {
    databaseErrorHandler(res);
  }
}

export const deleteExerciseByIdHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await deleteExerciseById(id);
    res.status(200).send(Constants.EXERCISE_DELETED);
  } catch (e) {
    databaseErrorHandler(res);
  }
}

function databaseErrorHandler(res: Response) {
  // TODO: Add logger to log the error message
  res.status(500).send(Constants.DATABASE_ACCESS_FAILED);
}
