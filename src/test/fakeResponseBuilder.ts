import FakeResponse from "./fakeResponse";

export default class FakeResponseBuilder {
    private _status = jest.fn().mockReturnThis();
    private _send = jest.fn().mockReturnThis();

    constructor() { }

    withStatus(value: any): FakeResponseBuilder {
        this._status = value;
        return this;
    };

    withSend(value: any): FakeResponseBuilder {
        this._send = value;
        return this;
    }

    build(): FakeResponse {
        return new FakeResponse(this._status, this._send);
    }
}