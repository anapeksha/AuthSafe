import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { constants, prisma } from "./config";
import { authRoute, profileRoute, userRoute } from "./routes";
import { logger } from "./utils";

const port = 8080;
const apiVersion = constants.API_VERSION;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(`/api/${apiVersion}`, userRoute);
app.use(`/api/${apiVersion}`, authRoute);
app.use(`/api/${apiVersion}`, profileRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Running at ${port}`);
});

process.on("SIGINT", function () {
  prisma.$disconnect();
  logger.info("Graceful shutdown triggered");
  process.exit(0);
});
