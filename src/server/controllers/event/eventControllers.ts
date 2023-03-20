import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Event from "../../../database/models/event/Event.js";

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

export const deleteEventById = async (
  req: Request<Record<string, unknown>, Record<string, unknown>>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id).exec();
    res.status(200).json({
      message: "Event succesfully deleted",
    });
  } catch (error: unknown) {
    next(error);
  }
};
