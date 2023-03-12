import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Event from "../../../database/models/event/Event";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().exec();
    res.status(200).json({
      events,
    });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Something went wrong",
      404,
      "We couldnt' find any event"
    );
    next(customError);
  }
};
