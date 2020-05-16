import dotenv from "dotenv";

dotenv.config();

export default class Secrets {
    public static DB_USER = process.env.DB_USER
    public static DB_HOST_DEV = process.env.DB_HOST_DEV
    public static DB_HOST_ALPHA = process.env.DB_HOST_ALPHA
    public static DB_DATABASE = process.env.DB_DATABASE
    public static DB_PASSWORD = process.env.DB_PASSWORD
    public static DB_TB_EXERCISES = process.env.DB_TB_EXERCISES
    public static DB_TB_USERS = process.env.DB_TB_USERS
    public static APP_ENV = process.env.APP_ENV
    public static PORT = 9000;
}