import { Router } from "express";
import exercisesRoutes from "./exercises/routes";
import usersRoutes from "./users/routes";
import authRoutes from "./auth/routes";

const router = Router();

router.use(exercisesRoutes, usersRoutes, authRoutes);

export default router;