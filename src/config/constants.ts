export class Constants {
    public static NO_EXERCISES_FOUND = "No exercises found";
    public static MISSING_PARAMS = "Missing params";
    public static DATABASE_ACCESS_FAILED = "A problem has occurred when accessing to database";
    public static INVALID_ID = "Invalid id";
    public static NO_EXERCISE_FOUND = "No exercise found";
    public static INVALID_NAME_PARAM = "Invalid name. This param can't be empty";
    public static INVALID_DESCRIPTION_PARAM = "Invalid description. This param can't be empty";
    public static INVALID_DIFFICULTY_PARAM = "Invalid difficulty: This params must be a number between 1 to 10";
    public static INVALID_USERNAME_LENGTH = "Invalid username. Should have 4 characters or more";
    public static INVALID_USERNAME_CHARACTERS = "Invalid username. Blank spaces are not valid and just - and _ are allowed";
    public static USERNAME_ALREADY_EXIST = "Username already exist";
    public static INVALID_EMAIL_PARAM = "Invalid email. Should be a real email address";
    public static INVALID_PASSWORD_LENGTH = "Invalid password. Should have 8 characters or more";
    public static INVALID_PASSWORD_FORMAT = "Invalid password. Should contain at lest 1 character and 1 number";
}

export class Endpoints {
    public static EXERCISES = "/exercises"
    public static EXERCISE = "/exercise"
    public static API_DOCS = "/api-docs";
}