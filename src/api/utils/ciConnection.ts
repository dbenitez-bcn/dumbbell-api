import { ConnectionOptions } from "typeorm";

export const ciConnection: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "circleci",
    password: "Passw0rd",
    database: 'circleci',
    entities: ["src/src/exercises/infrastructure/typeorm/entities/exercise.ts", "src/src/accounts/infrastructure/typeorm/entities/user.ts"],
    dropSchema: true,
    synchronize: true,
    logging: false
}