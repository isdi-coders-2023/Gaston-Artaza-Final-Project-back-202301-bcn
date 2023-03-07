import { CustomError } from "./CustomError";

describe("Given the CustomError class", () => {
  describe("When a new instance is created with the message 'Bad request', status code 400 and the public message 'Invalid request'", () => {
    test("Then the new instance should have the properties message and statusCode", () => {
      const mockExpectedError = {
        message: "Bad request",
        statusCode: 400,
        publicMessage: "Invalid Request",
      };

      const customError = new CustomError(
        mockExpectedError.message,
        mockExpectedError.statusCode,
        mockExpectedError.publicMessage
      );
      expect(customError).toHaveProperty("message", mockExpectedError.message);
      expect(customError).toHaveProperty(
        "statusCode",
        mockExpectedError.statusCode
      );
      expect(customError).toHaveProperty(
        "publicMessage",
        mockExpectedError.publicMessage
      );
    });
  });
});
