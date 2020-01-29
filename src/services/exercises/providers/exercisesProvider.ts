import { QueryResult } from "pg";
import { DumbbellDatabase } from "../../../models/database/dumbbellDatabase";

export const getExercises = async () => {
    const response: QueryResult = await DumbbellDatabase.database().query(`SELECT * FROM ${process.env.DB_TB_EXERCISES}  ORDER BY id ASC`);
    return response.rows;
}

export const createExercise = async (name: String, description: String, difficulty: number) => {
    const response: QueryResult = await DumbbellDatabase.database().query(`INSERT INTO ${process.env.DB_TB_EXERCISES} (name, description, difficulty) VALUES ('${name}', '${description}', '${difficulty}') RETURNING *`);
    return response.rows[0];
}