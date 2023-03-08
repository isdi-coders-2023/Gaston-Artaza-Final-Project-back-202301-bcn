import express from "express";
import morgan from "morgan";
import userRouters from "./routers/user/userRouters";

export const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", userRouters);
