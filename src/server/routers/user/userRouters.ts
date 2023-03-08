import { Router } from "express";
import { loginUser } from "../../controllers/user/userControllers";

const userRouters = Router();

userRouters.post("/login", loginUser);

export default userRouters;
