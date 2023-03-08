import { Router } from "express";
import { loginUser } from "../../controllers/user/userControllers.js";
import { check } from "express-validator";
import { checkFields } from "../../middleWares/checkFields.js";

const userRouters = Router();

userRouters.post(
  "/login",
  [
    check("username", "User name required").not().isEmpty(),
    check("password", "Password required").not().isEmpty(),
    check("password", "Password should have 6 characters minimun").isLength({
      min: 6,
    }),
  ],
  checkFields,
  loginUser
);

export default userRouters;
