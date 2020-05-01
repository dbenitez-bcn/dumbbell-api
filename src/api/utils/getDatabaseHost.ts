export const getDatabaseHost = () => {
    switch (process.env.APP_ENV) {
        case 'dev':
            return process.env.DB_HOST_DEV;
        case 'alpha':
            return process.env.DB_HOST_ALPHA;
        default:
            return process.env.DB_HOST_DEV;
    }
}