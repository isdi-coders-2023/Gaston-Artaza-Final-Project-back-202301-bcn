import { Router } from "express";
import {
  deleteEventById,
  getEvents,
} from "../../controllers/event/eventControllers.js";
import auth from "../../middleWares/auth/auth.js";

const eventRouters = Router();

eventRouters.get("/", getEvents);
eventRouters.delete("/:id", auth, deleteEventById);

export default eventRouters;
