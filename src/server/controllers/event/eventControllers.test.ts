import { type Request, type Response } from "express";
import Event from "../../../database/models/event/Event";
import { type Events } from "../../../types";
import { getEvents } from "./eventControllers";

describe("Given the getEvents controller", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<Request> = {};

  const next = jest.fn();
  const mockEvents: Events = [
    {
      name: "Summer Music Festival",
      location: "Costa Brava Beach",
      image: "summer_music_festival.jpg",
      date: "2023-07-15",
      time: "18:00:00",
      organizer: "ABC Productions",
      category: ["music", "festival"],
    },
  ];
  describe("When it recieves a request and there are events on the database", () => {
    test("Then it should call it status method with status code 200 and it json method with events data", async () => {
      Event.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue({
          mockEvents,
        }),
      });

      await getEvents(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("When it recieves a request but there aren't events on the database", () => {
    test("Then it should call it next method with an error with status code 404", async () => {
      const error = new Error("Something went wrong");

      const next = jest.fn();

      Event.find = jest.fn().mockReturnValue({
        limit: jest
          .fn()
          .mockReturnValue({ exec: jest.fn().mockRejectedValue(error) }),
      });

      await getEvents(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
