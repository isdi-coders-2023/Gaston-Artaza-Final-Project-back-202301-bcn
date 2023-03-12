import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../database/models/user/User.js";
import { type CustomTokenPayload, type UserCredentials } from "./types";
import { CustomError } from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new CustomError("User name not found", 401, "Wrong credentials");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomError("Wrong password", 401, "Wrong credentials");
    }

    const jwtPayload = {
      id: user?._id,
      username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
