import { type NextFunction, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { type UserTokenPayload, type CustomRequest } from "../../../types";
import jwt from "jsonwebtoken";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header("Authorization");

    if (!authorization) {
      throw new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );
    }

    if (!authorization.startsWith("Bearer")) {
      throw new CustomError(
        "Authorization missing Bearer",
        401,
        "Missing Bearer"
      );
    }

    const token = authorization.replace(/^Bearer\s*/, "");

    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserTokenPayload;

    req.userId = id;
  } catch (error: unknown) {
    next(error);
  }
};

export default auth;
