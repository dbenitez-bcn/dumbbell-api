import ExerciseDomain from "../../src/exercises/domain/aggregates/exercise";

const saveSpy = jest.fn();
const repoMock = jest.fn().mockReturnValue({
    save: saveSpy
})
jest.mock('typeorm', () => ({
    getRepository: repoMock,
    PrimaryGeneratedColumn: jest.fn(),
    Unique: jest.fn(),
    Column: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    Entity: jest.fn()
}));

import TypeormExerciseRepository from "./typeormExerciseRepository";

describe('Typeorm repository', () => {
    const sut = new TypeormExerciseRepository();

    afterEach(() => {
        jest.clearAllMocks()
        jest.clearAllTimers()
    })

    describe('create', () => {
        test('Should create an exercise and return the id', async () => {
            const exerciseDomain = new ExerciseDomain('A name', 'A description', 5);
            const params = {
                name: 'A name',
                description: 'A description',
                difficulty: 5
            }
            saveSpy.mockReturnValue({
                id: 1
            })

            const id = await sut.create(exerciseDomain)

            expect(saveSpy).toBeCalledWith(params);
            expect(id).toBe(1);
        })
    })
})