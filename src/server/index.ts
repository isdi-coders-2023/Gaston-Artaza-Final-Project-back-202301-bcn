import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouters from "./routers/user/userRouters.js";

export const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: "http://localhost:19006",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouters);
