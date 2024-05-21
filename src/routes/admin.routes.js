import { Router } from "express";
import { getAllUsers, deleteUser, updateUser} from "../controllers/admins.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", isAuth, isAdmin, getAllUsers);

router.put("/users/roles", isAuth, isAdmin, updateUser);

router.delete("/users/:id", isAuth, isAdmin, deleteUser);

export default router;
