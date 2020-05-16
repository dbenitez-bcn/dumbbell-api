import Secrets from "../config/secrets";

export const getDatabaseHost = () => {
    switch (Secrets.APP_ENV) {
        case 'dev':
            return Secrets.DB_HOST_DEV;
        case 'alpha':
            return Secrets.DB_HOST_ALPHA;
        default:
            return Secrets.DB_HOST_DEV;
    }
}