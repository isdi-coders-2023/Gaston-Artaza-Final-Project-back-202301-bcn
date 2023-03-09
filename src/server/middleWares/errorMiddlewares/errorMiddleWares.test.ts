import { type Request, type NextFunction, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

describe("Given a generalError middleware", () => {
  describe("When it receives a response and error with status 500", () => {
    test("Then it should call its status method with 500", () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req: Partial<Request> = {};
      const next: Partial<NextFunction> = () => ({});
      const statusCode = 500;
      const error = new CustomError("Error", statusCode, "Error");

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its json method with property error: 'Error'", () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req: Partial<Request> = {};
      const next: Partial<NextFunction> = () => ({});
      const statusCode = 500;
      const error = new CustomError("Error", statusCode, "Error");

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ error: error.publicMessage });
    });
  });
});

describe("Given the notFoundError middlware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the received next function", () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      notFoundError(req as Request, res as Response, next);

      expect(next).toBeCalled();
    });
  });
});
