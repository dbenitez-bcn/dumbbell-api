import InvalidToken from "../errors/invalidToken";

export default class BaererToken {
    readonly value: string;
    
    constructor(token: string) {
        const tokenSplitted = token.split(" ");
        if (!tokenSplitted[1] || tokenSplitted[0] !== 'Baerer') {
            throw new InvalidToken();
        }
        this.value = tokenSplitted[1];
    }
}