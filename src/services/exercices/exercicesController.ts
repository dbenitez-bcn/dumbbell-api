import { getExercicesFromDb } from './providers/exercicesProvider'

export const getExercices = async () => {
    return getExercicesFromDb();
}