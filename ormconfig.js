module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "synchronize": true,
    "logging": true,
    "logger": "file",
    "entities": ["src/src/exercises/domain/typeormEntities/exercise.ts", "src/src/accounts/domain/typeormEntities/user.ts"],
    "migrations": ["src/core/migrations/**/*.ts"],
    "cli": {
       "entitiesDir": "src/api/models/entities",
       "migrationsDir": "/src/core/migrations"
    }
}