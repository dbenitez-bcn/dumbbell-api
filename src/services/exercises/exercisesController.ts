import { Request, Response } from "express";
import { getExercises, createExercise } from './providers/exercisesProvider'

export const getExercisesHandler = async (req: Request, res: Response) => {
  try {
    const result = await getExercises();
    if (result.length > 0) res.status(200).send(result);
    else res.status(404).send("No exercises found");

  } catch (e) {
    databaseErrorHandler(res);
  }
}

export const createExerciseHandler = async (req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  if (name != null && description != null) {
    try {
      const result = await createExercise(name, description);
      res.status(201).send(result);
    } catch (e) {
      databaseErrorHandler(res);
    }
  } else {
    res.status(422).send("Missing params");
  }
}

function databaseErrorHandler(res: Response) {
  // TODO: Add logger to log the error message
  res.status(500).send("A problem has occurred when accessing to database");
}
