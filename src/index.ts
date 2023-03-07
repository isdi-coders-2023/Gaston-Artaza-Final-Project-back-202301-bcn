import "./loadEnvironment.js";
import createDebug from "debug";
import connectDatabase from "./database/connectDatabase.js";
import chalk from "chalk";
import startServer from "./server/startServer.js";

export const debug = createDebug("users:*");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL;

try {
  await connectDatabase(mongoDbUrl!);
  debug(chalk.green("Connected to data base"));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
