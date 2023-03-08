import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { app } from "../..";

import User from "../../../database/models/user/User";
import { token } from "morgan";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given the POST /user/login endpoint", () => {
  const mockUser = {
    username: "jose",
    password: "larralde12354'¡*",
    email: "larraldejose@gmail.com",
  };

  beforeAll(async () => {
    await User.create(mockUser);
  });

  describe("When it recieves request with the username 'jose' and password 'larralde12354¡*' and the user is registered", () => {
    test("Then it should respond with status 200 ", async () => {
      const path = "/users/login";
      const expectedStatus = 200;
      const expectedToken = "otroletrav744512*";

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(path)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });
});
