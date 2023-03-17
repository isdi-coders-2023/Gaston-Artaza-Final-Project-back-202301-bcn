import { Router } from "express";
import {
  deleteEventById,
  getEvents,
} from "../../controllers/event/eventControllers.js";

const eventRouters = Router();

eventRouters.get("/", getEvents);
eventRouters.delete("/:id", deleteEventById);

export default eventRouters;
