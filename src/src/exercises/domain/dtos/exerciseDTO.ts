export default class ExerciseDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly difficulty: number,
        readonly createdBy: string
    ) { }
}