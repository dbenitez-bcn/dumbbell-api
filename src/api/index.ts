import Secrets from "../core/secrets";
import { startServer } from "./server";

startServer()
    .then((server) => {
        server.listen(Secrets.PORT, () =>
            console.log(`Server is running in ${Secrets.APP_ENV} mode => http://localhost:${Secrets.PORT}...`)
        );
    })
    .catch(error => console.log(error));