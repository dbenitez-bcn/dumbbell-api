import { QueryResult } from "pg";
import { database } from "../../../config/database";

export const getExercises = async () => {
    const response: QueryResult = await database.query(`SELECT * FROM ${process.env.DB_TB_EXERCISES}  ORDER BY id ASC`);
    return response.rows;
}

export const createExercise = async (name: String, description: String) => {
    const response: QueryResult = await database.query(`INSERT INTO ${process.env.DB_TB_EXERCISES} (name, description) VALUES ('${name}', '${description}') RETURNING *`);
    return response.rows[0];
}