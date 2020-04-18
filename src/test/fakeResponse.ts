export default class FakeResponse {
    constructor(status: any, send: any) {
        this.status = status;
        this.send = send;
    }

    status: any;
    send: any;
}