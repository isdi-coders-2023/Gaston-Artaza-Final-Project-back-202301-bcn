import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../database/models/user/User";
import { type UserCredentials } from "./types";
import { CustomError } from "../../../CustomError/CustomError";

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
  const user = await User.findOne({ username }).exec();
  if (!user) {
    const customError = new CustomError(
      "User name not found",
      401,
      "Wrong credentials"
    );
    next(customError);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const customError = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );
    next(customError);
    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};
