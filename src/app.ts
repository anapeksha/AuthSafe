import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { constants } from "./config";
import { authRoute, userRoute } from "./routes";

const port = constants.PORT || 8080;
const apiVersion = constants.API_VERSION;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.use(`/api/${apiVersion}`, userRoute);
app.use(`/api/${apiVersion}`, authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Running at ${port}`);
});
