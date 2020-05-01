import { ExerciseBodyValidator } from "./validations";
import ExerciseCreationRequest from "../../models/requests/exerciseCreationRequest";
import ExerciseCreationBody from "../../models/bodies/exerciseCreationBody";
import { Constants } from "../../config/constants";

describe('Exercise validations', () => {
    const sut = new ExerciseBodyValidator();

    describe('Creation', () => {
        test('Given a valid body should build a request', () => {
            const body: ExerciseCreationBody = {
                name: 'A valid name',
                description: 'A valid description',
                difficulty: 5
            }
            const expected = new ExerciseCreationRequest('A valid name', 'A valid description', 5);

            const actual: ExerciseCreationRequest = sut.creationBody(body);

            expect(actual).toStrictEqual(expected);
        })

        describe('Name validations', () => {
            test('Given an empty name should throw missing param', async () => {
                const test = () => {
                    const body: ExerciseCreationBody = {
                        name: '',
                        description: 'A valid description',
                        difficulty: 5
                    }

                    sut.creationBody(body)
                }

                expect(test).toThrow(new Error(Constants.INVALID_NAME_PARAM));
            })

            test('Given a shot name should build a request', () => {
                const body: ExerciseCreationBody = {
                    name: 'A',
                    description: 'A valid description',
                    difficulty: 10
                }
                const expected = new ExerciseCreationRequest('A', 'A valid description', 10);

                const actual: ExerciseCreationRequest = sut.creationBody(body);

                expect(actual).toStrictEqual(expected);
            })
        })

        describe('Description validations', () => {
            test('Given an empty description should throw missing param', async () => {
                const test = () => {
                    const body: ExerciseCreationBody = {
                        name: 'A valid name',
                        description: '',
                        difficulty: 5
                    }

                    sut.creationBody(body)
                }

                expect(test).toThrow(new Error(Constants.INVALID_DESCRIPTION_PARAM));
            })

            test('Given a shot description should build a request', () => {
                const body: ExerciseCreationBody = {
                    name: 'A valid name',
                    description: 'A',
                    difficulty: 10
                }
                const expected = new ExerciseCreationRequest('A valid name', 'A', 10);

                const actual: ExerciseCreationRequest = sut.creationBody(body);

                expect(actual).toStrictEqual(expected);
            })
        })

        describe('Difficulty validations', () => {
            test('Given a difficulty less than 1 should throw an error', async () => {
                const test = () => {
                    const body: ExerciseCreationBody = {
                        name: 'A valid name',
                        description: 'A valid description',
                        difficulty: 0
                    }

                    sut.creationBody(body)
                }

                expect(test).toThrow(new Error(Constants.INVALID_DIFFICULTY_PARAM));
            })

            test('Given a difficulty more than 10 should throw an error', async () => {
                const test = () => {
                    const body: ExerciseCreationBody = {
                        name: 'A valid name',
                        description: 'A valid description',
                        difficulty: 11
                    }

                    sut.creationBody(body)
                }

                expect(test).toThrow(new Error(Constants.INVALID_DIFFICULTY_PARAM));
            })

            test('Given a difficulty with value 1 should build a request', () => {
                const body: ExerciseCreationBody = {
                    name: 'A valid name',
                    description: 'A valid description',
                    difficulty: 1
                }
                const expected = new ExerciseCreationRequest('A valid name', 'A valid description', 1);

                const actual: ExerciseCreationRequest = sut.creationBody(body);

                expect(actual).toStrictEqual(expected);
            })

            test('Given a difficulty with value 10 should build a request', () => {
                const body: ExerciseCreationBody = {
                    name: 'A valid name',
                    description: 'A valid description',
                    difficulty: 10
                }
                const expected = new ExerciseCreationRequest('A valid name', 'A valid description', 10);

                const actual: ExerciseCreationRequest = sut.creationBody(body);

                expect(actual).toStrictEqual(expected);
            })
        })
    })
})