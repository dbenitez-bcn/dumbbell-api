import User from "../aggregates/user";

export interface ExerciseUserRepository {
    create(user: User): void
}