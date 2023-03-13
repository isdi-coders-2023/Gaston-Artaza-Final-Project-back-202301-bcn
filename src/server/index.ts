import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouters from "./routers/user/userRouters.js";
import eventRouters from "./routers/event/eventRouters.js";
import {
  generalError,
  notFoundError,
} from "./middleWares/errorMiddlewares/errorMiddlewares.js";

export const app = express();
app.disable("x-powered-by");

const localHost = ["http://localhost:19006"];

const options: cors.CorsOptions = {
  origin: localHost,
};

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouters);
app.use("/events", eventRouters);

app.use(notFoundError);
app.use(generalError);
