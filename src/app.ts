import express, { Express, Request, Response } from "express";
import { constants } from "./config";
import { userRoute } from "./routes";

const port = constants.PORT;
const apiVersion = constants.API_VERSION;
const app: Express = express();

app.use(`/api/${apiVersion}`, userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Running");
});
