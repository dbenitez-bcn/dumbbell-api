export class Constants {
    public static NO_EXERCISES_FOUND = "No exercises found";
    public static USER_NOT_FOUND = "User not found";
    public static LOGIN_FAILURE = "Email or password incorrect. Please try again.";
    public static INVALID_USERNAME_LENGTH = "Invalid username. Should have 4 characters or more";
    public static INVALID_USERNAME_CHARACTERS = "Invalid username. Blank spaces are not valid and just - and _ are allowed";
    public static USERNAME_ALREADY_EXIST = "Username already exist";
    public static EMAIL_ALREADY_EXIST = "Email already exist";
    public static INVALID_EMAIL_PARAM = "Invalid email. Should be a real email address";
    public static MISSING_EMAIL = "Missing email address";
    public static INVALID_PASSWORD_LENGTH = "Invalid password. Should have 8 characters or more";
    public static INVALID_PASSWORD_FORMAT = "Invalid password. Should contain at lest 1 character in capital and 1 number";
    public static MISSING_PASSWORD = "Missing password";
}

export class Endpoints {
    public static EXERCISES = "/exercises"
    public static EXERCISE = "/exercise"
    public static API_DOCS = "/api-docs";
    public static REGISTER = "/register";
    public static LOGIN = "/login";
}