import InvalidEmail from "../errors/invalidEmail";

export default class Email {
    constructor(value: string) {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            throw new InvalidEmail();
        }
        this.value = value;
    }

    readonly value: string;
}