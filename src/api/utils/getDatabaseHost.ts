import Secrets from "../../core/secrets";

export const getDatabaseHost = (appEnv: string | undefined) => {
    switch (appEnv) {
        case 'dev':
            return Secrets.DB_HOST_DEV;
        case 'alpha':
            return Secrets.DB_HOST_ALPHA;
        default:
            return Secrets.DB_HOST_DEV;
    }
}