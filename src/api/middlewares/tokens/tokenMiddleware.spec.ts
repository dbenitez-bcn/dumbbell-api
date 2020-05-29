import "reflect-metadata";
import { Request } from "express";
import TokenMiddleware from "./tokenMiddleware";
import TokenService from "../../../src/tokens/application/tokenService";
import { FakeResponseBuilder } from "../../test/testutils";
import InvalidToken from "../../../src/tokens/domain/errors/invalidToken";

describe('tokenMiddleware', () => {
    const A_BAERER_TOKEN = 'Baerer token';
    const next = jest.fn();
    const getTokenDataFromBaerer = jest.fn();
    const statusSpy = jest.fn().mockReturnThis();
    const sendSpy = jest.fn().mockReturnThis();
    const res = new FakeResponseBuilder().withStatus(statusSpy).withSend(sendSpy).build();
    const req = {
        headers: {
            Authorization: A_BAERER_TOKEN
        },
        body: {}
    } as unknown as Request;
    const fakeTokenService = {
        getTokenDataFromBaerer
    } as unknown as TokenService;
    const sut = new TokenMiddleware(fakeTokenService);

    describe('validateToken', () => {
        afterEach(() => {
            req.body = {};
            req.headers = {
                Authorization: A_BAERER_TOKEN
            }
            jest.clearAllMocks();
            jest.clearAllTimers();
        })

        test('Should get the token and set in the request body', () => {
            const A_USERNAME = 'username';
            getTokenDataFromBaerer.mockReturnValueOnce({ username: A_USERNAME });

            sut.validateToken(req, res, next);

            expect(req.body.username).toBe(A_USERNAME);
            expect(getTokenDataFromBaerer).toBeCalledWith(A_BAERER_TOKEN);
            expect(next).toBeCalledTimes(1);
        })

        test('Given an invalid token should fail', () => {
            const error = new InvalidToken();
            getTokenDataFromBaerer.mockImplementationOnce(() => {
                throw error;
            });

            sut.validateToken(req, res, next);

            expect(req.body.username).toBeUndefined();
            expect(getTokenDataFromBaerer).toBeCalledWith(A_BAERER_TOKEN);
            expect(next).toBeCalledTimes(0);
            expect(statusSpy).toBeCalledWith(401);
            expect(sendSpy).toBeCalledWith(error.message);
        })

        test('Given no token should fail', () => {
            const error = new InvalidToken();
            getTokenDataFromBaerer.mockImplementationOnce(() => {
                throw error;
            });
            req.headers = {};

            sut.validateToken(req, res, next);

            expect(req.body.username).toBeUndefined();
            expect(getTokenDataFromBaerer).toBeCalledWith('');
            expect(next).toBeCalledTimes(0);
            expect(statusSpy).toBeCalledWith(401);
            expect(sendSpy).toBeCalledWith(error.message);
        })
    })
})