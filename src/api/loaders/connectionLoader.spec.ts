const connectSpy = jest.fn();
jest.mock('typeorm', () => ({
    createConnection: connectSpy
}));
import { connectionLoader } from "./connectionLoader";
import { testConnection } from "../utils/testConnection";
import { defaultConnection } from "../utils/defaultConnection";

describe('Connection loader', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    })
    test('Given test enviornment should return test connection', async () => {
        await connectionLoader('test');

        expect(connectSpy).toBeCalledWith(testConnection);
    });

    test('Given undefined enviornment should return test connection', async () => {
        await connectionLoader(undefined);

        expect(connectSpy).toBeCalledWith(testConnection);
    });

    test('Given dev enviornment should return default connection', async () => {
        await connectionLoader('dev');

        expect(connectSpy).toBeCalledWith(defaultConnection);
    });
})