import { ConnectionOptions } from "typeorm";

export const ciConnection: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "circleci",
    password: "Passw0rd",
    database: 'circleci',
    entities: ["src/src/exercises/domain/typeormEntities/exercise.ts", "src/src/accounts/domain/typeormEntities/user.ts"],
    dropSchema: true,
    synchronize: true,
    logging: false
}