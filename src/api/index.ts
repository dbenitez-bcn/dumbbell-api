import Secrets from "../core/secrets";
import { startServer } from "./server";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

startServer()
    .then((server) => {
        server.listen(Secrets.PORT, () =>
            console.log(`Server is running in ${Secrets.APP_ENV} mode => http://localhost:${Secrets.PORT}...`)
        );
    })
    .catch(error => console.log(error));