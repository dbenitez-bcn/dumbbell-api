import User from "../domain/aggregates/user"

export const getFakeUser = () => {
    return new User("username", "user");
}