import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { NextFunction, Request, Response } from "express";
import auth from "./auth.js";
import { CustomError } from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../../types.js";

const req: Partial<Request> = {};
const next = jest.fn();
const res = {} as Response;

describe("Given the auth middleware ", () => {
  describe("When it recieves a request without autorization header", () => {
    test("Then it should call the next method with a status code 401 and message 'Missing token'", () => {
      const expectedStatus = 401;
      const expectedAuthError = new CustomError(
        "Authorization header missing",
        401,
        "Missing token"
      );

      req.header = jest.fn().mockReturnValueOnce(undefined);

      auth(req as CustomRequest, res, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedAuthError);
    });
  });

  describe("When it recieves a request that not start with 'Bearer'", () => {
    test("Then it should call the next method with a status code 401 an 'Missing Bearer' message", () => {
      const expectedAuthError = new CustomError(
        "Authorization header missing",
        401,
        "Missing Bearer"
      );

      req.header = jest.fn().mockReturnValueOnce("somethingwrong838383");

      auth(req as CustomRequest, res, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedAuthError);
    });
  });

  describe("When it receives a request with an authorization header 'Bearer JpfngUzr86iO55218EvdpUAIRSThbUEmessi'", () => {
    test("Then it should add the userId property and the token to the request and invoke next", () => {
      req.header = jest
        .fn()
        .mockReturnValueOnce("Bearer JpfngUzr86iO55218EvdpUAIRSThbUEmessi");

      const userId = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValueOnce({ id: userId });

      auth(req as CustomRequest, res, next as NextFunction);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("userId", userId);
    });
  });
});
