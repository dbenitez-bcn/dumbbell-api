import { getDatabaseHost } from "./getDatabaseHost"
import Secrets from "../config/secrets";

describe('getDatabaseHost', () => {
    test('Given dev enviornmet should return the development host', () => {
        const result = getDatabaseHost('dev');

        expect(result).toBe(Secrets.DB_HOST_DEV);
    })

    test('Given alpha enviornmet should return the alpha host', () => {
        const result = getDatabaseHost('alpha');

        expect(result).toBe(Secrets.DB_HOST_ALPHA);
    })

    test('Given test enviornmet should return the dev host', () => {
        const result = getDatabaseHost('test');

        expect(result).toBe(Secrets.DB_HOST_DEV);
    })

    test('Given undefined enviornmet should return the dev host', () => {
        const result = getDatabaseHost(undefined);

        expect(result).toBe(Secrets.DB_HOST_DEV);
    })
})