import InvalidToken from "../errors/invalidToken";

export default class BearerToken {
    readonly value: string;
    
    constructor(token: string) {
        const tokenSplitted = token.split(" ");
        if (!tokenSplitted[1] || tokenSplitted[0] !== 'Bearer') {
            throw new InvalidToken();
        }
        this.value = tokenSplitted[1];
    }
}