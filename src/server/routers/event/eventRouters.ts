import { Router } from "express";
import { getEvents } from "../../controllers/event/eventControllers";

const eventRouters = Router();

eventRouters.get("/", getEvents);

export default eventRouters;
