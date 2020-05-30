import Name from "../valueObject/name";
import Description from "../valueObject/description";
import Difficulty from "../valueObject/difficulty";

export default class Exercise {
    constructor(id: number, name: string, description: string, difficulty: number) {
        this.id = id;
        this.name = new Name(name);
        this.description = new Description(description);
        this.difficulty = new Difficulty(difficulty);
    }

    readonly id: number;
    readonly name: Name;
    readonly description: Description;
    readonly difficulty: Difficulty;
}