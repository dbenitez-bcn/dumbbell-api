import Name from "../valueObject/name";
import Description from "../valueObject/description";
import Difficulty from "../valueObject/difficulty";
import CreatedBy from "../valueObject/createdBy";

export default class Exercise {
    constructor(id: number, name: string, description: string, difficulty: number, createdBy: string) {
        this.id = id;
        this.name = new Name(name);
        this.description = new Description(description);
        this.difficulty = new Difficulty(difficulty);
        this.createdBy = new CreatedBy(createdBy);
    }

    readonly id: number;
    readonly name: Name;
    readonly description: Description;
    readonly difficulty: Difficulty;
    readonly createdBy: CreatedBy;
}