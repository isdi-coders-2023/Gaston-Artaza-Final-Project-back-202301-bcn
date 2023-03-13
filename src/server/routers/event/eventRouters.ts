import { Router } from "express";
import { getEvents } from "../../controllers/event/eventControllers.js";

const eventRouters = Router();

eventRouters.get("/", getEvents);

export default eventRouters;
