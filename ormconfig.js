module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": "5432",
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "syncronize": false,
    "logging": true,
    "logger": "file",
    "entities": ["src/models/entities/**/*.ts"],
    "migrations": ["src/database/migrations/**/*.ts"],
    "cli": {
       "entitiesDir": "src/models/entities",
       "migrationsDir": "src/database/migrations"
    }
}