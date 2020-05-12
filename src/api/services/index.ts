import exercisesRoutes from "./exercises/routes";
import usersRoutes from "./users/routes";
import authRoutes from "./auth_old/routes";

export default [...exercisesRoutes, ...usersRoutes, ...authRoutes];