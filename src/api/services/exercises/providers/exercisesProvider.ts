import { QueryResult } from "pg";
import { DumbbellDatabase } from "../../../models/database/dumbbellDatabase";

export const getExercises = async () => {
    const response: QueryResult = await DumbbellDatabase.database().query(`SELECT * FROM ${process.env.DB_TB_EXERCISES} ORDER BY id ASC`);
    return response.rows;
}

export const createExercise = async (name: String, description: String, difficulty: Number) => {
    const response: QueryResult = await DumbbellDatabase.database().query(`INSERT INTO ${process.env.DB_TB_EXERCISES} (name, description, difficulty) VALUES ($aesc6$${name}$aesc6$, $aesc6$${description}$aesc6$, $aesc6$${difficulty}$aesc6$) RETURNING *`);
    return response.rows;
}

export const getExerciseById = async (id: Number) => {
    const response: QueryResult = await DumbbellDatabase.database().query(`SELECT * FROM ${process.env.DB_TB_EXERCISES} WHERE id = ${id} LIMIT 1`);
    return response.rows;
}

export const deleteExerciseById = async (id: Number) => {
    const response: QueryResult = await DumbbellDatabase.database().query(`DELETE FROM ${process.env.DB_TB_EXERCISES} WHERE id = ${id}`);
    return response.rows;
}

export const updateExercise = async (id: Number, name: String, description: String, difficulty: Number) => {
    const response: QueryResult = await DumbbellDatabase.database().query(`UPDATE ${process.env.DB_TB_EXERCISES} SET name = $aesc6$${name}$aesc6$, description = $aesc6$${description}$aesc6$, difficulty = $aesc6$${difficulty}$aesc6$, updated_at = now() WHERE id = ${id}`);
    return response.rows;
}