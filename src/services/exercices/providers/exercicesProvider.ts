import { QueryResult } from "pg";
import { database } from "../../../config/database";

export const getExercicesFromDb = async () => {
    const response: QueryResult = await database.query(`SELECT * FROM ${process.env.DB_TB_EXERCICES}`);

    return response.rows;
}