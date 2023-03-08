import { type Response, type NextFunction, type Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../database/models/user/User";

import { loginUser } from "./userControllers";
import { CustomError } from "../../../CustomError/CustomError";
import mongoose from "mongoose";
import { type UserCredentials } from "./types";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const mockUser: UserCredentials = {
    username: "jose",
    password: "larralde78/*zz",
  };

  describe("When it receives a request with a username 'jose' and password 'larralde78/*zz' and the user is not registered in the database", () => {
    test("Then it should call its next method with a status 401 and the messages 'User name not found' and 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "User name not found",
        401,
        "Wrong credentials"
      );
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it recieves a request with a username  'jose' and password 'larralde' and the user is registered in the database but the password is incorrect", () => {
    test("Then it shouls call  the next method with the message 'Wrong password', the status code 401 and the message 'Wrong credentials'", async () => {
      const mockError = new CustomError(
        "Wrong password",
        401,
        "Wrong credentials"
      );

      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe("When it receives a request with a username 'jose' and password 'larralde78/*zz' and the user is registered in the database", () => {
    const expectedToken = "otroletravaladna9¡*25";
    const expectedResponse = { token: expectedToken };

    test("Then it should call its status method with 200", async () => {
      const expectedStatusCode = 200;
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its json method with a token", async () => {
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
